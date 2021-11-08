export const partners=() => {


	const cardItem=document.querySelector('.cards-restaurants');


	console.dir(cardItem)

	const renderItems=(data) => {

		data.forEach(item => {
			const a=document.createElement('a');
			a.setAttribute('href','/restaurant.html');
			a.classList.add('card', 'cards-restaurants');
			a.dataset.products=item.products;
			a.innerHTML=`
			<a href="restaurant.html" class="card card-restaurant">
						<img src=${item.image} alt=${item.name}/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${item.name}</h3>
								<span class="card-tag tag">${item.time_of_delivery} мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
									${item.stars}
								</div>
								<div class="price">От ${item.price} ₽</div>
								<div class="category">${item.kitchen}</div>
							</div>
							<!-- /.card-info -->
						</div>
						<!-- /.card-text -->
					</a>`
					console.log(a.dataset.products)
					cardItem.append(a);
					a.addEventListener('click',e=>{
						console.dir(e)
						e.preventDefault();
						if(localStorage.getItem('user')){
							localStorage.setItem('restaurant',JSON.stringify(item));
							window.location.href='/restaurant.html'
						}else{
							//window.location.href='/'
							document.querySelector('.modal-auth').style.display='flex'
						}
						
					})
		});

	}
	fetch('https://pizzaplus-4c873-default-rtdb.firebaseio.com/db/partners.json')
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