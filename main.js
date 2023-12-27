// دریافت المنت دکمه های ماشین حساب
let operators = document.querySelectorAll('.operator')
// دریافت ورودی از کاربر
let input = document.querySelector('.input')
for(let operator of [...operators]){
  operator.addEventListener('click',(e)=>{
    input.value+=e.target.innerHTML
  })
}
// نوشتن لیسنر برای  پاک کردن عدد 
document.querySelector('.clear').addEventListener('click',()=>{
  input.value=''
  localStorage.clear()
  document.querySelector('.show-math').innerHTML=''
})
document.querySelector('.one-operator-delete').addEventListener('click',()=>{
  let inputValue = input.value.split('')
  let myValue = [...inputValue]
  myValue.pop()
  input.value=myValue.join('')
})
let count = Object.keys(localStorage).filter(key=>key.includes('history')).length || 0 
document.querySelector('.result').addEventListener('click',result)
document.querySelector('.form').addEventListener('submit',result)
function result(e){
  e.preventDefault()
  if (input.value) {
    let value = input.value.split('').map(c => {
      if (c == "×") c = "*"
      if (c == "÷") c = "/"
      return c
    })
    count++
    let storageName = `history${count}`
    localStorage.setItem(storageName, value.join(""))
    try {
      input.value = eval(value.join(''))
      let element = document.createElement('div')
      element.innerHTML += `
          <h3>${value.join('')}</h3>
          <h2>=${eval(value.join(''))}</h2>
          `
      document.querySelector('.show-math').appendChild(element)
    } catch (e) {
      alert('math syntax error')
      input.value = ""
    }
  }
}
let element = document.createElement('div')
// نمایش مقدار وارد شده کاربر در بالای اینپوت    
  let keys = Object.keys(localStorage).filter(key => key.includes('history')).reverse()
    for (key of keys) {
      element.innerHTML += `
        <h3>${localStorage.getItem(key)}</h3>
        <h2>=${eval(localStorage.getItem(key))}</h2>
        `
        document.querySelector('.show-math').appendChild(element)
    }
