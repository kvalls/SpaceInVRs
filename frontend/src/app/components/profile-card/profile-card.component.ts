import { SessionService } from './../../shared/services/session.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { PhotoService } from './../../shared/services/photo.service';
import { User } from './../../shared/auth/user';
import { AuthService } from './../../shared/auth/auth.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Storage } from '@ionic/storage';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ViewDidEnter, ViewWillEnter, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, ViewDidEnter {

  highestScore: string = "";
  ownScores: any = [];
  ownScoresLabels: any = [];

  ownSessions: any = [];
  ionicForm: FormGroup;
  deleteUser = false;
  isSubmitted: boolean = false;
  user: User;
  capturedPhoto: string = "";

  constructor(
    private userService: UserService, 
    public authService: AuthService,
    private photoService: PhotoService,
    private storage: Storage,
    private sessionService: SessionService,
    private router: Router,
    public formBuilder: FormBuilder,
    private alertController: AlertController) { }

  ngOnInit() {

    this.authService.getUserData().then((data) => {
      this.user = data;
      // console.log("holaola "+this.user.id+" holaola");
      // console.log("holaola "+this.user.role_id+" holaola");
      // console.log("eeee ",this.user," eeee");
      // console.log("eeee ",this.user.email," eeee");
      this.ionicForm.setValue({
        name: this.user.name,
        email: this.user.email,
        password: ''
      });
    });

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
    this.getOwnSessions();
  }

  refreshModal(){
    this.authService.getUserData().then((data) => {
      this.user = data;
      this.ionicForm.setValue({
        name: this.user.name,
        email: this.user.email,
        password: ''
      });
    });

  }

  ionViewDidEnter() {
    // console.log(this.authService.getUserData());
    // this.updateChart();

    this.authService.getUserData().then((data) => {
      this.user = data;
    });

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.getOwnSessions();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  public onDeleteClick(): void {
    this.deleteUser = true;
  }

  public onUpdateClick(): void {
    this.deleteUser = false;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning:',
      message: 'Delete account?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.delete();
          },
        },
      ],
    });

    await alert.present();

  }


  public onSubmit(): void {
    if(this.deleteUser) {
      this.presentAlert();
    }else {
      this.update();
    }

  }

  async delete() {
    let token = await this.storage.get("token");
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let user: User = {
        id: this.user.id,
        email: this.ionicForm.value.email,
        password: this.ionicForm.value.password,
        name: this.ionicForm.value.name,
      };
      
      this.userService.deleteUser(token, user).subscribe((res) => {
        this.authService.logout();
        this.router.navigateByUrl('/home');
        setTimeout(() => {
          location.reload()
        }, 1000);
      });
    }
  }

  async update() {
    let token = await this.storage.get("token");
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log('hello?')
      console.log(this.ionicForm.value);
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      let user: User = {
        id: this.user.id,
        email: this.ionicForm.value.email,
        password: this.ionicForm.value.password,
        name: this.ionicForm.value.name,
      };
      console.log('huh??')
      this.userService.updateUser(token, user, blob).subscribe((res) => {
        this.authService.login(user).subscribe((res) => {
          if (!res.access_token) {
            console.log("invalid credentials");
            return;
          }

          this.ionicForm.setValue({
            name: this.ionicForm.value.name,
            email: this.ionicForm.value.email,
            password: this.ionicForm.value.password
          });
        }, err => {
          console.log("Error");
        });

        this.router.navigateByUrl('/profile');
        this.router.navigate([this.router.url])
        setTimeout(() => {
          location.reload()
        }, 1000);
      });
    }
    
  }
  
  //Chartjs stuff below

  async getOwnSessions() {
    let data = await this.storage.get("userdata");
    let id = data.id;
    let token = await this.storage.get("token");
    console.log("PROFILECARD");
    console.log(data.id);

    this.sessionService.getOwnSessions(token,id).subscribe(res => {
      console.log("User Logged in. This is this user's list:");
      console.log(res);
      this.ownSessions = res;
      // console.log("lalalla "+this.ownSessions[0].score);

      // Array of the last 7 user's sessions' scores because slice(-7)
      this.ownSessions.slice(-7).forEach(session => {
        this.ownScores.push(session.score);
        // this.ownScoresLabels.push(session.createdAt)
        const date = new Date(session.createdAt);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // add leading zero if necessary
        const day = date.getDate().toString().padStart(2, '0'); // add leading zero if necessary
        this.ownScoresLabels.push(`${month}-${day}`);
      });

      //Getting the highest score
      this.highestScore = this.ownSessions.reduce((maxScore, session) => {
        if(session.score != null){
        const score = session.score;
        return score > maxScore ? score : maxScore;
        }else{
          return 0
        }
        
      }, 0);
      
      console.log(`The highest score is ${this.highestScore}`);

      console.log(this.ownScores);
      console.log(this.ownScoresLabels);
      this.updateChart();
      
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
    });
  }
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        color: 'white',
        anchor: 'start',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    
    labels: this.ownScoresLabels,
    datasets: [
      { data: this.ownScores, label: 'Score', hoverBackgroundColor: '#B50C0C', backgroundColor: '#505054' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
    this.ownScores.length = 0; // Clear existing array
    this.ownScoresLabels.length = 0; // Clear existing array
    // this.chart?.update();
    this.getOwnSessions();
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
    this.chart?.update();
  }

  public updateChart(): void {
    this.chart?.update();
  }


}
