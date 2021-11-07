export const menu= () => {

	let rest=""
	if (localStorage.getItem('restaurant')){
		rest=JSON.parse(localStorage.getItem('restaurant'));
		console.log(rest)
		console.log(`https://pizzaplus-4c873-default-rtdb.firebaseio.com/db/${rest}`)
	} else{
		window.location.href='/'
	}
	



	const cardMenu=document.querySelector('.cards-menu');

	console.dir(cardMenu)

	const changeTitle=(restaurant)=>{
		const title=document.querySelector('.restaurant-title')
		title.innerText=restaurant;
	}

	const renderItems=(data) => {
		
		data.forEach(({ id,name,description,price,image}) => {
			
			const card=document.createElement('div');
			card.classList.add('card');
			card.innerHTML=`
			<div class="card">
						<img src=${image} alt=${name} class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
						<!-- /.card-text -->
					</div>`
					cardMenu.append(card)
			console.log(card)
		});
		
	}
	fetch(`https://pizzaplus-4c873-default-rtdb.firebaseio.com/db/${rest.products}`)
		.then(res => {
			return res.json();
		}
		)
		.then(data => {
			changeTitle(rest.name)
			renderItems(data);
		}
		)
		.catch(err => {
			console.log(err)
		})
}