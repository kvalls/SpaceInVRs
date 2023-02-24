# Usability

## Webpage

- The color palette has a high contrast to make it clearly readable throughout the app:

![image](https://user-images.githubusercontent.com/95490470/221236129-7bc2c9c3-cea3-44d1-8607-8d39d503e558.png)


- When you first enter, you are greeted by a Homescreen that acts as a splashscreen:

![image_2023-02-24_16-16-06](https://user-images.githubusercontent.com/95490470/221233107-9617804a-9b71-4bdc-8409-d3d81995bb90.png)


- When you click the "Enter" button, it will check whether you're logged in (if you have an access_token) and send you to your profile, but if you aren't logged in it will send you to the login page, making it easier to navigate for recurrent users:

![image](https://user-images.githubusercontent.com/95490470/221233544-7e87e774-3786-46e6-b890-e01fe9d71452.png)
![image](https://user-images.githubusercontent.com/95490470/221233598-86518ec8-9f33-45bb-a49d-27fdfb19184c.png)


- The textfields of the Login page have a grayed-out placeholder to help users identify the "email" and "password" fields:

![image](https://user-images.githubusercontent.com/95490470/221236994-0a86e0c0-6465-4008-8241-cd7d0cdf6f09.png)

- The buttons of the Login page are big and readable, helping mobile users tap the correct button with their fingers:

![image](https://user-images.githubusercontent.com/95490470/221237067-b7e053db-41ed-435f-9027-c160f427d262.png)

- The Login textfields are validated, helping the user get notified when they're missing a field or they filled them incorrectly:

![image](https://user-images.githubusercontent.com/95490470/221236726-66e090dd-a3e5-45a5-8ef2-591abccd9026.png)
![image](https://user-images.githubusercontent.com/95490470/221239074-49954f15-13a0-479d-940d-86d4cee9d224.png)
![image](https://user-images.githubusercontent.com/95490470/221238193-d68647db-3fa7-4bcc-9a64-60a31e9c5564.png)
![image](https://user-images.githubusercontent.com/95490470/221238232-66073466-04aa-4efa-9991-b4b0f27c4e24.png)

- As you're writing, they also have a red/green border below that instantly lets the user know when they've input it correctly before hitting any submit buttons:

![image](https://user-images.githubusercontent.com/95490470/221239435-3bed1ff1-8738-424f-be0b-8a856fa856fb.png)
![image](https://user-images.githubusercontent.com/95490470/221239522-18f00c9b-6266-48ac-b8d8-b38b38ad9526.png)


- The Login password textfield hides your password as you're writing it, so it can't be seen by any nearby person looking at the screen, screen recordings, etc:

![image](https://user-images.githubusercontent.com/95490470/221238822-979e01ac-94fc-4eb5-9658-f7f5371a7445.png)


- All of the above is also true in the Register section:

![image](https://user-images.githubusercontent.com/95490470/221241374-04814f7e-2255-4588-8f80-236454c9a30d.png)


- There is a header always at the top that checks whether you're logged in and lets the user know, it also brandishes the logo of the app, in this case "SpaceInVRs":

![image](https://user-images.githubusercontent.com/95490470/221242161-59d43210-e009-4f33-a27d-63c8f85c60e2.png)
![image](https://user-images.githubusercontent.com/95490470/221243500-5237d7cb-dedd-46c0-a5e6-75f549741be8.png)
![image](https://user-images.githubusercontent.com/95490470/221244795-0cfccfb1-adcf-4ad4-8a0b-28a1ea1ec91b.png)


- If a user accidentally went to Register when they already have an account to login with, they can just click back on the "Login" in the header:

![image](https://user-images.githubusercontent.com/95490470/221242989-3c59e38b-9d00-44f8-89c1-781a919e9486.png)
![image](https://user-images.githubusercontent.com/95490470/221243191-8427fdc5-43b5-423b-ad84-ca825b0b88a4.png)


- If a user is in their profile and they click "Logout", they will be logged out and taken back to the Home splashscreen:

![image](https://user-images.githubusercontent.com/95490470/221244002-bbad1099-a0c4-4b14-90eb-a7f3555e0bfd.png)
![image](https://user-images.githubusercontent.com/95490470/221244292-e19929a4-5b83-4f46-acfd-5c129c38ffa0.png)

- In the Profile page, users can see a graph, their name, their email and a button to edit their profiles. In addition, if they're admin they also get access to the "reports" buttons, getting reports of either all the sessions or all the users.

![image](https://user-images.githubusercontent.com/95490470/221247731-3fce0eb2-7009-4244-a34e-71dda2e10b7a.png)

- The graph is interactable, it showcases the last 7 sessions' scores that you've submitted and you can click on a bar to highlight it:

![image](https://user-images.githubusercontent.com/95490470/221248841-d987cb78-0ed9-44c4-86b6-5365666c5ffc.png)

- At the top of the graph, you can keep track of your all-time highest score, including all of your sessions and not just the last 7:

![image](https://user-images.githubusercontent.com/95490470/221251620-78a4c49d-932e-4df1-b9f2-da2c47a65012.png)

- You can also see the dates when those sessions were submitted below and inside the highlight dialog:

![image](https://user-images.githubusercontent.com/95490470/221249565-103c109b-88a5-4a7c-8f46-69d9066b992c.png)
![image](https://user-images.githubusercontent.com/95490470/221249594-611fe742-1cca-469e-b0f3-88f67fdaf925.png)

- In case that you've submitted new sessions and can't see them on the page, just by clicking on the graph it will fetch the data again from the backend, refreshing and showing you your newest sessions without having to close or restart the page:

![image](https://user-images.githubusercontent.com/95490470/221252069-81d5f33f-f152-4e09-b4c9-b72296411a3e.png)

***clicked**

![image](https://user-images.githubusercontent.com/95490470/221252270-ec6408c7-389f-4b25-9c97-2701ae868365.png)
![image](https://user-images.githubusercontent.com/95490470/221252295-0f2bfee2-55d4-490f-95ae-935e224e07e4.png)


- When you click on "Edit Profile" a modal window will appear with an animation, darkening out your profile card, so you are still on your profile page and don't have to navigate anywhere else:

![image](https://user-images.githubusercontent.com/95490470/221254046-280a6a73-79fc-4550-ac81-761be345d6a3.png)

- You can easily update your profile's data using this modal window, even change your profile image:

![image](https://user-images.githubusercontent.com/95490470/221254683-8ad8269b-d20b-4d1b-9a2c-b10425fdfc96.png)
![image](https://user-images.githubusercontent.com/95490470/221254733-25197101-e053-4a68-8095-29e7f39c4203.png)

- If you tap anywhere outside the modal window, on the darkened background, the modal window will close and you can keep viewing your profile without making any changes:

![image](https://user-images.githubusercontent.com/95490470/221255439-8623b146-b636-40c3-8394-0e5b73cc4b4f.png)
![image](https://user-images.githubusercontent.com/95490470/221255460-b6745ffb-361e-4f9e-a08c-3c894550c7f8.png)

- If you click on "Delete", an alert window will pop up warning you, so you don't accidentally delete your account:

![image](https://user-images.githubusercontent.com/95490470/221255648-4cd7a24e-8ded-4902-983c-041c38eb35fa.png)


## Game
- Game takes place in one place, and all enemies come from the same side, except at different heights and distances. This provides a fun and dynamic experience that kinda feels like a shooting gallery. As your movements are restricted mainly to moving your head only a bit and your hand to aim and avoid bullets, this makes the game not as dizzy to play in VR as others.

- Enemies are color-coded in regards to how dangerous they are:
  - Green enemies take around 4 seconds to shoot.
  - Yellow enemies take around 2.5 seconds to shoot.
  - Purple and white enemies shoot every second.
  ![image](https://user-images.githubusercontent.com/103140108/221263851-7e4a4460-6bd6-4f29-bb9d-f8fa7fdc6fee.png)
  
  This makes them easy to distinct.
  
- The game is paused as soon as you let go off the grip button to make pausing the game quick and easy.
  ![image](https://user-images.githubusercontent.com/103140108/221267447-3240ba1f-d990-4b33-8eac-13f9b4573597.png)
