| ⚠️ Attention                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| As you may know if you've taken a look at the code... it's not great and some major changes are necessary and currently in the works. Specifically, since teamtrees.org has no official API endpoints which allow us to get the required data, this application relies on web scraping, which is **built** into the application. Safe to say, that's not the brightest idea, which the rewrite should fix by having it's own, indepedent API, doing all of the web scraping. The desktop application can then safely pull data from that instead. |

<h1>
  <img src="./assets/icons/icon.png" width="25" />
  Treecord
</h1>

Discord <a href="https://teamtrees.org">teamtrees.org</a> rich presence built into a portable <a href="https://electronjs.org">Electron</a> application.

<i>(windows release only, compatibility with other operating systems is planned)</i>

[Download (Pre-Release)](https://github.com/cykreet/treecord/releases)

![Donation User](./assets/examples/donation-user.png)

## Usage

Once downloaded, simply run the application and it should pop-up in your operating system's tray, it'll then attempt to connect to a Discord client and relay the latest information from teamtrees.org to the connected user's activity. From the tray context menu, you can view the application version, currently connected user and a button to terminate the application.

![Tray Context Menu](./assets/examples/tray.png)
