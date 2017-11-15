# Request Data Viewer

For this exercise, we've got a partial implementation of a tool used to view data about abitrary requests.

Our users often need to spot-check requests to see what their duration was, to verify that the duration reported elsewhere
matches with our raw data. We have many requests, so this data can get very large very quickly.

Unfortunately, there are outstanding bugs and performance issues with this implementation that we need to fix.

## Information
- This was built using node 8.7.0 (and depends upon ES6 features like `const` and `let`)
- To generate data, run `generate` (macOS) or the appropriate command for your architecture
- The only other instructions we have are to run `yarn && yarn start`
- This implementation is a broken skeleton, so feel free to make _any_ changes you feel are valuable or necessary.

## Goals
First, fix the bugs present in `src/App.js` to get sample data rendering.

Next, we want to scale up our data set. Swap `data_100.json` to `data_10000.json`.
This seems to have a significantly negative impact on browser performance.

We'll need to implement something to reduce the amount of data loaded in the browser,
as well as improve the user experience while viewing the data.

The solution is entirely up to you, but the faster the data loads and the more easily users can navigate to specific requests, the better.

There are larger data sets under the `public` directory after `generate.js` is run - feel free to test your solution by loading larger and larger.

## Output
Please send us:
- a compressed file containing all of your code, without the data files
- the name of the largest `data_${count}.json` file you used
- any thoughts, questions, or struggles you had

Example code for generating a zip file:
```
rm public/data*.json
cd ..
zip -r challenge.zip challenge
```