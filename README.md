# discord-tt

simple discord rpc for [teamtrees.org](https://teamtrees.org). this project was my excuse to try out typescript, guaranteed the 2nd best typescript project on github. was it worth it? absolutely not, but also yes, this will most likely break into several million pieces after teamtrees' deadline, so there's that.

![Example-1](/images/example-1.png)

![Example-2](/images/example-2.png)

![Example-3](/images/example-3.png)

## instructions

before we setup the project itself, head over to [discord's developer portal](https://discordapp.com/developers) and create an application with the name of your choosing, this will be displayed in your rpc. then, upload all the images in [images](/images) to your application's rich presence art assets, except for the example images. unless you plan on modifying the code, it is very important that they're uploaded with their original names. lastly, keep note of 
your client id as we'll be using that shortly.

1. clone this repository:
```bash
$ git clone https://github.com/Cykreet/discord-tt.git
```
2. rename `.env.example` to `.env`. 
3. copy your application's previously mentioned client id and replace the `application_client_id` placeholder in `.env`.
4. run these commands from your command line:
```bash
# install dependencies
$ npm install

# compile typescript to javascript
$ npm run-script build

# run compiled index.js
$ npm start
```
5. badabingbadaboom.

thanks to [sylver](https://github.com/sylv) for helping me when i was stuck, truly an angel, papa bless 🙏🏻.
thanks to [Auxority](https://github.com/Auxority) for inspiring me with his own [discord teamtrees rpc](https://github.com/Auxority/DiscordTeamTrees) project.
