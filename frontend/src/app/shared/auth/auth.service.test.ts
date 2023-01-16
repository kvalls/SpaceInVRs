import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { User } from './user';



const user: User = {
  id: 1,
  password: 'password',
  name: 'Test User',
  email: 'test@example.com',
  profile_img: 'test.png',
  role_id: 1
};


describe('AuthService', () => {
  let authService: AuthService;
  let httpClient: HttpClient;
  let storage: Storage;

  beforeEach(() => {
    httpClient = new HttpClient(null);
    storage = new Storage(null,null);
    authService = new AuthService(httpClient, storage);
  });

  // test('should call storage.set for register', async () => {

  //   const setSpy = jest.spyOn(storage, 'set');

  //   authService.register(user);

  //   expect(setSpy).toHaveBeenCalledWith('token', 'access_token');
  //   expect(setSpy).toHaveBeenCalledWith('userdata', 'user');
  // });

  // test('should call storage.set for login', async () => {

  //   const setSpy = jest.spyOn(storage, 'set');

  //   authService.login(user);

  //   expect(setSpy).toHaveBeenCalledWith('token', 'access_token');
  //   expect(setSpy).toHaveBeenCalledWith('userdata', 'user');
  // });

  test('should call storage.remove for logout', async () => {
    const removeSpy = jest.spyOn(storage, 'remove');

    authService.logout();

    expect(removeSpy).toHaveBeenCalledWith('token');
  });

  test('should call storage.get for getUserData', async () => {
    const getSpy = jest.spyOn(storage, 'get').mockReturnValue(Promise.resolve('userdata'));

    authService.getUserData();

    expect(getSpy).toHaveBeenCalledWith('userdata');
});

  test('should call storage.get and set loginStatus for isLoggedIn', async () => {
    const getSpy = jest.spyOn(storage, 'get').mockReturnValue(Promise.resolve('token'));

    authService.isLoggedIn();
    expect(getSpy).toHaveBeenCalledWith('token');
    expect(authService.loginStatus).toEqual(0);
  });
});

