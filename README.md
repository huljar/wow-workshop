# WoW Workshop

A World of Warcraft multi-tool for character assessment.

## How to use

You need a Blizzard API key to use this tool. If you don't have one yet, you
can obtain one [https://develop.battle.net/access/](on battle.net).

The API key consists of a client ID and a secret. Place this information into
the file `src/battlenet/apikey.json`. It has the following structure:

```json
{
    "client_id": "<your_id>",
    "client_secret": "<your_secret>"
}
```

If you just cloned the repo, you can just copy the `apikey.json.example` file
and then replace the placeholder values with your personal credentials.

## License

This software is licensed under the GNU General Public License version 3 or
newer. For more information, refer to the [LICENSE.md](LICENSE.md) file.
