const list_items = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","v","u","w"
]

const list_elements_wrapper = document.querySelector(".list-items");
const pagination = document.querySelector(".pagination");
let currentPage = 1;
let items_per_page = 2;
let total = Math.ceil(list_items.length / items_per_page);
function displayItems(items , wrapper , items_per_page ,pageNum){
    wrapper.innerHTML = "";  // so we can replace the previous content
    pageNum--; // we start at 1 but out list_items start at 0 

    let start = items_per_page * pageNum;
    let end = start + items_per_page;
    let paginated_items = list_items.slice(start,end);
    

    for(let element of paginated_items){
        let div = document.createElement("div");
        div.classList.add("item");
        div.textContent = element;
        wrapper.appendChild(div)
    }

}

function setupPagination(items,wrapper,items_per_page){
    wrapper.innerHTML = ""
//   let pageCount = Math.ceil(items.length / items_per_page);
// let total = Math.ceil(items.length / items_per_page);
  pageCount = pageNumbers(total,6,currentPage)
  
//   for(let i = 0 ; i<pageCount ; i++){
//        let btn = paginationButton(i+1,items);
//        wrapper.appendChild(btn);
//   }
// next btn 
const disabled = {
    next:  currentPage === total,
    prev:  currentPage === 1,
    start: pageCount[0]==1 ,
    end: pageCount[pageCount.length-1]==total
}

nextAndPrevBtn("start",wrapper,disabled.start,items)
nextAndPrevBtn("prev",wrapper,disabled.prev,items)
 let fragment = document.createDocumentFragment();
   for(let element of pageCount){
    let btn = paginationButton(element,items);
           fragment.appendChild(btn);
   }
   wrapper.appendChild(fragment)

  

   nextAndPrevBtn("next",wrapper,disabled.next,items)
   nextAndPrevBtn("end",wrapper,disabled.end,items)
   
}

function nextAndPrevBtn(name,wrapper,disabled =false,items){
    let btn = document.createElement("button");
     if(name=="start" || name =="end")
     btn.textContent = name;
     else if(name=="next"){
     let i = document.createElement("i");
         i.setAttribute("class","fa fa-angle-double-right")
         btn.appendChild(i)
        
     }
     else if(name=="prev"){
        let i = document.createElement("i");
        i.setAttribute("class","fa fa-angle-double-left")
        btn.appendChild(i)
       
     }
     btn.classList.add("btn");
     btn.id = name;
     btn.setAttribute("type","button");
     btn.disabled = disabled
     wrapper.appendChild(btn)

     btn.addEventListener("click",()=>{
         if(name=="next"){
             currentPage++;
             
         }
         else if(name=="prev"){
             currentPage--;
         }
         else if(name == "start"){
            currentPage = 1;
         }
         else if(name=="end"){
             currentPage=total;
         }
         setupPagination(list_items,pagination,items_per_page)
         displayItems(items,list_elements_wrapper,items_per_page,currentPage)
     })

}

function paginationButton(index,items){
    let btn = document.createElement("button");
    btn.textContent = index;
    btn.classList.add("btn")
    btn.setAttribute("type","button")
    if(index == currentPage){
        btn.classList.add("active");
    }
    
    btn.addEventListener("click",(event)=>{
     currentPage =index;
     console.log(currentPage,"c")
    let current_btn = document.querySelector(".pagination > button.active")
     current_btn.classList.remove("active");
     event.target.classList.add("active")
     displayItems(items,list_elements_wrapper,items_per_page,index)
     setupPagination(list_items,pagination,items_per_page)
    })
    return btn;
}
displayItems(list_items,list_elements_wrapper,items_per_page,currentPage)
setupPagination(list_items,pagination,items_per_page)


function pageNumbers(total,max,current){
    let half = Math.round(max/2);  // before and after 
    let to = max;
    // to not having buttons more than we need 
    if(current +half  >= total){
        to = total;
        
    }
    // to increase the buttons from the end
    else if(current > half){
        to = current + half
        
      
    }
    let from = to - max;
    
   
    return Array.from({length:max},(_,i)=>{return (i+1)+from})
}

// let temp = pageNumbers(100,6,5);
// console.log(temp)

