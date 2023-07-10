# Use release-git programmatically

From Node.js scripts, release-git can also be used as a dependency:

```js
import release from 'release-git';

release(options).then(output => {
  console.log(output);
  // { version, latestVersion, name, changelog }
});
```
