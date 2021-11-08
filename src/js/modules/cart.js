export const cart=()=>{
	const buttonCart=document.getElementById('cart-button')
	const modalCart=document.querySelector('.modal-cart');
	const close=document.querySelector('.close')
	const cartBody=document.querySelector('.modal-cart').querySelector('.modal-body');
	const sendCart=modalCart.querySelector('.button-primary');
	const clearCart=modalCart.querySelector('.clear-cart');
	const totalPrice=document.querySelector('.modal-pricetag')


	const incrementCount=(id)=>{
		const cartArray=JSON.parse(localStorage.getItem('cart'))
		cartArray.map(item=>{
			if(item.id===id){
				item.count++
			}
		})
		localStorage.setItem('cart',JSON.stringify(cartArray))
		renderCart(JSON.parse(localStorage.getItem('cart')))
		console.log(id)
	}

	const decrementCount=(id)=>{
		const cartArray=JSON.parse(localStorage.getItem('cart'))
		cartArray.map(item => {
			if (item.id===id) {
				item.count=item.count > 0 ? item.count-1 : 0;
			}
		})
		const newArr=cartArray.filter(item=>{
			return item.count>0
		})
		localStorage.setItem('cart',JSON.stringify(newArr))
		renderCart(newArr)
		console.log(id)
	}

	const resetCart=()=>{
		 cartBody.innerHTML='';
		 localStorage.removeItem('cart');
		 modalCart.classList.remove('is-open')
	}

	const totalSum=(data)=>{
		const total=data.reduce((sum,item)=>{
			return sum + item.price*item.count;
		},0)
		totalPrice.innerHTML=total+ ' ₽';
	}

	const renderCart=data => {
		
		console.log(cartBody)
		cartBody.innerHTML='';
		data.forEach(cartItem => {
			//console.dir(cartItem)
			const cartRow=document.createElement('div');

			cartRow.classList.add('food-row');
			cartRow.innerHTML=`
			<span class="food-name">${cartItem.name}</span>
					<strong class="food-price">${cartItem.price*cartItem.count} ₽</strong>
					<div class="food-counter">
						<button data-index=${cartItem.id} class="counter-button btn-dec">-</button>
						<span class="counter">${cartItem.count}</span>
						<button data-index=${cartItem.id} class="counter-button btn-inc">+</button>
					</div>`
			cartBody.append(cartRow)
			/* cartRow.querySelector('.btn-dec').addEventListener('click',()=>{
				decrementCount(cartItem.id)
			})
			cartRow.querySelector('.btn-inc').addEventListener('click',()=>{
				incrementCount(cartItem.id)
			}) */
	
		})
		totalSum(data)

	}

	cartBody.addEventListener('click',(e) => {
		e.preventDefault();
		console.log('click')
		console.log(e.target)
		if (e.target.classList.contains('btn-dec')) {
			decrementCount(e.target.dataset.index)
		} else if (e.target.classList.contains('btn-inc')) {
			incrementCount(e.target.dataset.index)
		}
	})

	buttonCart.addEventListener('click',()=>{
		renderCart(JSON.parse(localStorage.getItem('cart')))
		modalCart.classList.add('is-open');
	})


	close.addEventListener('click',()=>{
		modalCart.classList.remove('is-open');
	})

	sendCart.addEventListener('click',()=>{
		const cartArray = localStorage.getItem('cart');

		fetch('https://jsonplaceholder.typicode.com/posts',{
			method: 'POST',
			body: cartArray
		})
		resetCart()
	})

	clearCart.addEventListener('click',()=>{
		resetCart()
	})
}