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


@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {

  highestScore: string = "";
  ownScores: any = [];
  ownScoresLabels: any = [];

  ownSessions: any = [];
  ionicForm: FormGroup;
  isSubmitted: boolean = false;
  user: User;
  capturedPhoto: string = "";

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private photoService: PhotoService,
    private storage: Storage,
    private sessionService: SessionService,
    private router: Router,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getOwnSessions();
    
    this.authService.getUserData().then((data) => {
      this.user = data;
      console.log("holaola "+this.user.id+" holaola");
      console.log("holaola "+this.user.role_id+" holaola");
      console.log("eeee ",this.user," eeee");
    });
    // this.userService.getUser(this.user);

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })

    this.updateChart();
  }

  handleClick() {
    // window.location.replace('http://localhost:5488/templates/g-UQf7YbRO');
  }

  ionViewDidEnter() {
    console.log(this.authService.getUserData());
    this.updateChart();
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

  register() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value);
      let user: User = {
        id: null,
        email: this.ionicForm.value.email,
        password: this.ionicForm.value.password,
        name: this.ionicForm.value.name,
        role_id: 2,
      };
      this.authService.register(user).subscribe((res) => {
        this.router.navigateByUrl('/profile');
        this.ionicForm.reset();
      });
    }
    
  }
  
  //Chartjs stuff below

  async getOwnSessions() {
    let data = await this.storage.get("userdata");
    let id = data.id;
    let token = await this.storage.get("token");

    // this.authService.getUserData().then((data) => {
    //   this.user = data;
    //   console.log("holaola "+this.user.id+" holaola");
    //   console.log("holaola "+this.user.role_id+" holaola");
    //   console.log("eeee ",this.user," eeee");
    // });
    console.log("PROFILECARD");
    console.log(data.id);

    this.sessionService.getOwnSessions(token,id).subscribe(res => {
      console.log("User Logged in. This is this user's list:");
      console.log(res);
      this.ownSessions = res;
      console.log("lalalla "+this.ownSessions[0].score);

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
        const score = session.score;
        return score > maxScore ? score : maxScore;
      }, 0);
      
      console.log(`The highest score is ${this.highestScore}`);

      // this.ownScoresLabels = this.ownScoresLabels.map(date => {
      //   const d = new Date(date);
      //   const month = (d.getMonth() + 1).toString().padStart(2, '0'); // add leading zero if necessary
      //   const day = d.getDate().toString().padStart(2, '0'); // add leading zero if necessary
      //   return `${month}-${day}`;
      // });

      console.log(this.ownScores);
      console.log(this.ownScoresLabels);

      
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
      //this.router.navigateByUrl("/home");
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
    this.chart?.update();
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
    this.chart?.update();
  }

  public updateChart(): void {
    // Only Change 3 values
    // this.barChartData.datasets[0].data = [
    //   Math.round(Math.random() * 100),
    //   59,
    //   80,
    //   Math.round(Math.random() * 100),
    //   56,
    //   Math.round(Math.random() * 100),
    //   40 ];

    this.chart?.update();
  }


}
