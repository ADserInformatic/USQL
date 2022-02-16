let hamburguer = document.getElementById('hamburguer');
let link = document.querySelectorAll('.links a');
let conten = document.getElementById('conten');
let ele1 = document.getElementById('line1');
let ele2 = document.getElementById('line2');
let ele3 = document.getElementById('line3');



conten.style.display="none";
hamburguer.addEventListener('click', ()=>{
    conten.classList.add('desapa')
    ele1.classList.remove('line1');
    ele2.classList.remove('line2');
    ele3.classList.remove('line3');
    if(conten.style.display == 'block'){
        setTimeout(()=>{
            conten.style.display = 'none';
            conten.innerHTML = '';
        }, 1000)
    }else{
      link.forEach(uno =>{
        conten.appendChild(uno)
        conten.classList.add('aparece')
        conten.style.display = 'block';
        conten.classList.remove('desapa')
        ele1.classList.add('line1');
        ele2.classList.add('line2');
        ele3.classList.add('line3');
    })  
    }
    
})
conten.addEventListener('click', ()=>{
    conten.classList.add('desapa')
    ele1.classList.remove('line1');
    ele2.classList.remove('line2');
    ele3.classList.remove('line3');
    if(conten.style.display == 'block'){
        setTimeout(()=>{
            conten.style.display = 'none';
            conten.innerHTML = '';
        }, 1000)
    }
})
