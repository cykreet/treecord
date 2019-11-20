# discord-tt

simple discord rpc for [teamtrees.org](https://teamtrees.org). this will most likely break into several million pieces after teamtrees' deadline, so there's that.

![Example-1](/assets/examples/example-1.png)

![Example-2](/assets/examples/example-2.png)

![Example-3](/assets/examples/example-3.png)

if you'd like to use your own discord application (badge images and name) instead of the one used in the examples above, follow the [custom discord application](#custom-discord-application) instructions before following the main instructions.

### custom discord application

head over to [discord's developer portal](https://discordapp.com/developers) and create an application with the name of your choosing, this will be displayed in your rpc. then, upload all the images in [assets](/assets) to your application's rich presence art assets, except for the example images. unless you plan on modifying the code, it is very important that they're uploaded with their original names. lastly, replace the client id located in `.env` with your application's client id.

## instructions

1. clone this repository:
```bash
$ git clone https://github.com/Cykreet/discord-tt.git
```
2. run the following commands:
```bash
# install dependencies
$ npm install

# compile typescript to javascript
$ tsc

# run compiled index.js
$ npm start
```
3. badabingbadaboom.

thanks to [sylver](https://github.com/sylv) for helping me when i was stuck, truly an angel, papa bless 🙏🏻. thanks to [Auxority](https://github.com/Auxority) for inspiring me with his own [discord teamtrees rpc](https://github.com/Auxority/DiscordTeamTrees) project.

do note that neither i or this project are in any way associated with [teamtrees.org](https://teamtrees.org).
