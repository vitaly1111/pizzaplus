export const partners=() => {


const renderItems=(data)=>{
	data.forEach(item => {
		console.log(item)
	});
}
	fetch('./db/partners.json')
		.then( res => {
			return res.json()
		}
		)
		.then(data => {
			renderItems(data)
		}
	)
	.catch(err=>{
		console.log(err)
	})
}