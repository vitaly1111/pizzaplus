export const menu=(rest) => {

	//const rest="food-band";
	const renderItems=(data) => {
		
		data.forEach(item => {
			console.log(item)
		});
		
	}
	fetch(`./db/${rest}.json`)
		.then(res => {
			return res.json();
		}
		)
		.then(data => {
			renderItems(data);
		}
		)
		.catch(err => {
			console.log(err)
		})
}