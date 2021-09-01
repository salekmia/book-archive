const spinner = document.getElementById('spinner')
spinner.style.display = 'none'
const searchInput = document.getElementById('search-input')
const searchResult = document.getElementById('search-result')
const errorMessage = document.getElementById('error-message')
const bookResult = document.getElementById('book-result')

// Search Button Function
const searchBook = () => {
    spinner.style.display = 'block'
    const searchText = searchInput.value
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(searchInput.value == '') {
            displayError()
            errorMessage.innerText = `Input can't be empty!`
        } else {
            if(data.numFound == 0) {
                displayError()
                errorMessage.innerText = `No result found`
            }else {
                displayError()
                displayResult(data.docs)
            }
        }
    })
}

// display error
const displayError = () => {
    spinner.style.display = 'none'
    searchInput.value = ''
    errorMessage.innerText = ''
    searchResult.innerText = ''
    bookResult.innerText = ''
}

// display result
const displayResult = (results) => {
    displayError()
    spinner.style.display = 'none'
    bookResult.innerText = `Book found ${results.length}`
    results.forEach(result => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="text-center">${result.title}</h3>
                    <h5><span class="text-primary">Athur Name:</span> ${result.author_name[0]}</h5>
                    <h5><span class="text-primary">First Publish:</span> ${result.first_publish_year}</h5>
                    <h5><span class="text-primary">Publisher:</span> ${result.publisher[0]}
                </div>
            </div>
        `
        searchResult.appendChild(div)
    })
}