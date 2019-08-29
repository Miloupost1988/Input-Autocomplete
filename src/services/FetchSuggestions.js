const fetchSuggestions = (userInput) => {
		this.baseRoute = 'http://localhost:3000';
		this.apiSearchRoute = '/search';

		return fetch(`${this.baseRoute}${this.apiSearchRoute}?q=${userInput}`)
			.then(response => response.json());
};

export default fetchSuggestions;
