A fork of the MIT licensed [buzzer from bufferapp](https://github.com/bufferapp/buzzer)

Customized for La Fureur 2 at Optania Christmas party.

If you can, you should use hardware buttons. Those are way more fun than this, and also makes checking against cheating way easier because you can just forbid the use of smartphones. This is more of a last resort option. Check out [this article on Hackaday](https://hackaday.com/2019/08/20/game-on-with-these-open-source-arduino-buzzers/)

![Buzzer screenshot](/screenshots/buzzer.png "Buzzer screenshot")

## Known issues
* Host is not warned when audio permissions aren't given
* Buzzer sounds can overlap
* Number of joined users does not decrease when users leave the buzzer
* Teams are not deduplicated
* Everything is unauthenticated
* Dependencies are outdated

## Installation 
First clone this repo, might require installing Git:
```
git clone https://gitlab.com/eloydegen/hacker-jeopardy-buzzer
cd hacker-jeopardy-buzzer
```
### Debian
```
sudo apt update && sudo apt install nodejs npm
npm install
node index.js
```
### Docker
```
docker build -t buzzer .
docker run -p 8090:8090 buzzer
```

Open http://localhost:8090 in your browser to start!

#### Optional: Nginx reverse proxy
```
sudo apt install certbot python3-certbot-nginx nginx
```

Add the following to `/etc/nginx/sites-available/default`:
```
server_name example.com;

location / {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

Get a certificate:
```
sudo certbot --nginx -d example.com
```

## Usage 

The players goto the homepage (`http://localhost:8090/`) and they can enter their name and team
number. Joining will give them a giant buzzer button!

The host heads over to `/host` and will be able to see everyone that buzzes in and clear the list
in between questions.

## Game rules
* The first team is chosen at random and can choose a category and level. They are not required to raise a question and can wait until a buzzer is pressed.
* The host should give some explaination of the categories.
* The first team that presses the buzzer can say the question
* If it is right, that team is assigned that number of point 
* If it is wrong, the point of that question will be deducted. No answer is wrong as well.
* If nobody knows, the host can ask the audience. If even the audience does not know it, the host will read the question.

## Advice 
* Put a punishment on incorrectly pressing the buzzer. Might be fine to give the teams some time to test whether it works, but afterwards it should stop.
* Have a separete person who is a judge about the correctness. Then the host does not need to know all the answers as well, and it might avoid a sense of bias by the host.
* Use a microphone and speaker. 
* Multiple displays might be useful to be able to show the quiz on full screen and the buzzer on another screen. Make sure to remember to clear the buzzer after every question.
* Create a team for the audience.
* As explained by an experienced host of Hacker Jeopardy: the game is mostly not a knowledge quiz for the participating teams, but entertainment for the audience. The 100-300 questions should be known by a large part of the audience. The 400 and 500 questions can be harder. If the audiences knowns almost nothing, it will not be entertaining for them.
