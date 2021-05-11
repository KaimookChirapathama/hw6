// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  // console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre

  // check number of listing in the csv
  // console.log(`There are ${moviesFromCsv.length} movies`)

  // conditions for the result
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
  // create empty object to store results 
    let returnValue = {}
    // create empty array 
    returnValue.movies = []

    // loop through the movie list
    for (let i=0; i < moviesFromCsv.length; i++) {
      // store each listing in the memory
      let movieList = moviesFromCsv[i]

      // check if the year and the genres match the input, if yes:
      if (movieList.startYear == year && movieList.genres == genre) {
      // create new object to show the fields we want to show
      let object = {
        title: movieList.primaryTitle,
        year: movieList.startYear,
        genre: movieList.genres
      }
      // push the object to the movies array in the returnValue 
      returnValue.movies.push(object) 
      }    
      // add a number of results to the returnValue object
      returnValue.numResults = returnValue.movies.length
    }
    
    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}


