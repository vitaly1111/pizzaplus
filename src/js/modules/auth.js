export const auth=() => {
	const buttonAuth=document.querySelector('.button-auth');
	const buttonOut=document.querySelector('.button-out');
	const userName=document.querySelector('.user-name');
	const modalAuth=document.querySelector('.modal-auth');
	const closeAuth=document.querySelector('.close-auth');
	const logInForm=document.getElementById('logInForm');
	const inputLogin=document.getElementById('login');
	const inputPassword=document.getElementById('password');

	console.dir(modalAuth);
	console.log(inputLogin)
	console.log(inputPassword)

	const openModal=() => {

	}
	const logIn=(user) => {
		console.log(user)
		buttonAuth.style.display="none";
		buttonOut.style.display='flex';
		userName.style.display='block';
		userName.textContent=user.login;
		modalAuth.style='display:none';

	}
	const logOut=(user) => {
		buttonAuth.style.display="flex";
		buttonOut.style.display='none';
		userName.style.display='none';
		userName.textContent='';
		localStorage.removeItem('user')
	}

	buttonAuth.addEventListener('click',() => {
		modalAuth.style='display:flex';
	})
	closeAuth.addEventListener('click',() => {
		modalAuth.style='display:none';
	})

	logInForm.addEventListener('submit',(e) => {
		e.preventDefault();

		const user={
			login: inputLogin.value,
			pass: inputPassword.value
		}
		//logIn(user)
		if (inputLogin.value!="") {
			localStorage.setItem('user',JSON.stringify(user))
			logIn(JSON.parse(localStorage.getItem('user')))

		} else {
			alert('Логин или пароль неверен')
		}


	})

	buttonOut.addEventListener('click',() => {
		logOut();
	})
	if (localStorage.getItem('user')) {
		console.log(JSON.parse(localStorage.getItem('user')))
		logIn(JSON.parse(localStorage.getItem('user')))
	}
}