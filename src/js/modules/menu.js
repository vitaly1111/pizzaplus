
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

	const changeRating=(stars)=>{
		const rating=document.querySelector('.rating')
		rating.innerHTML=stars
	}

	const changePrice=receipt=>{
		const price=document.querySelector('.price')
		price.innerHTML=`От ${receipt} ₽`
	}
	const changeCategory=kitchen=>{
		const category=document.querySelector('.category')
		category.innerHTML=kitchen
	}

	

	const addToCart=({id,name, price,count})=>{
		const cartArr=localStorage.getItem('cart')?
			JSON.parse(localStorage.getItem('cart')):
			[];
		if(cartArr.some(item=>item.id===id)){
			cartArr.map(item=>{
				if(item.id===id){
					item.count++
				}
			})
		}else{
			cartArr.push({ id,name,price,count })
			
		}
		localStorage.setItem('cart',JSON.stringify(cartArr))
	
		console.log({id,name,price,count})
		console.dir(cartArr)
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
			card.querySelector('.button-add-cart').addEventListener('click',()=>{
				addToCart({id,name,price,count:1})
			})
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
			changeRating(rest.stars)
			changePrice(rest.price)
			changeCategory(rest.kitchen)
			renderItems(data);
		}
		)
		.catch(err => {
			console.log(err)
		})
}