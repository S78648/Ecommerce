 const productList = document.querySelector('.productList');
 

async function getProductData(){
    try{
        const httpRes = await fetch('https://fakestoreapi.com/products')
      const productList = await httpRes.json();
      allProducts = productList
      return productList
    }catch(e){
        console.log(`Error: ${e}`);
        return []
    } 
}

async function displayDataAndCategories(){
     const productsData = await getProductData();

   /*   console.log(productsData[0]); */
    renderCategories(productsData);
     renderData(productsData);
    
}


function renderData(productsData){
    productList.innerHTML = '';
    productsData.forEach(function(productData){
        //create new product
        const product = createProduct(productData);
        //append them into DOM 
        productList.appendChild(product);
         
     })
}

function createProduct(productData){

    const product = document.createElement('div');
    product.className = 'product';

    const productImg = document.createElement('div');
    productImg.className = 'productImg'

    const img = document.createElement('img');
    img.setAttribute('src',productData.image);
    productImg.appendChild(img);

    const productDescription = document.createElement('div')
    productDescription.className = 'productDescription'

    /* const description = document.createElement('p');
    description.className ='description';
    description.textContent = productData.description; */

    const title = document.createElement('h4');
    title.className = 'title'
    title.textContent = productData.title;

    const ratings = document.createElement('div');
    ratings.className = 'ratings'
    const rating = document.createElement('span');
    rating.textContent = `Rating ${productData.rating.rate}/5`;
    const count = document.createElement('span');
    count.textContent = `${productData.rating.count} reviews`;

    ratings.appendChild(rating);
    ratings.appendChild(count);

    const productCategory = document.createElement('p');
    productCategory.className = 'productCategory'
    productCategory.textContent = `Category: ${productData.category}`;

    const price = document.createElement('p')
    price.className = 'price'
    price.textContent = `Rs. ${productData.price}`;

    /* productDescription.appendChild(description); */
    productDescription.appendChild(title);
    productDescription.appendChild(ratings);
    productDescription.appendChild(productCategory)
    productDescription.appendChild(price);

    product.appendChild(productImg);
    product.appendChild(productDescription);

    return product;
}

displayDataAndCategories();

/* Get Search Method  */

const searchInput = document.querySelector('.searchInput');
var allProducts;

searchInput.addEventListener('input',(e)=>{
    //get the search input text
    let searchValue = e.target.value.toLowerCase();

    //filter out the search products
    let filterProducts = allProducts.filter((product)=>product.title.toLowerCase().startsWith(searchValue));

    renderData(filterProducts);
})

//get Category Filter Method

const categorySelectList = document.querySelector('.categoryList');

function renderCategories(productsData){
   
    const categories = getCategories(productsData);
    console.log(categories);
    let select = document.createElement('select');
    select.setAttribute('name','category');
    select.id = 'category';

    let option = document.createElement('option');
        option.setAttribute('value',"");
        option.textContent = "None";
        select.appendChild(option);

        categories.forEach((category)=>{
            let option = document.createElement('option');
            option.setAttribute('value',category);
            option.textContent = category;
            select.appendChild(option);
        })
    
        categorySelectList.appendChild(select);

    select.addEventListener('change',onCategoryChange);
}

function onCategoryChange(e){
    const selectedCategory = e.target.value;
         
    if(!selectedCategory){ 
        renderData(allProducts);
    }else{
        const filterProductsCategories = allProducts.filter((products)=>products.category == selectedCategory);

        renderData(filterProductsCategories);
    }
    
}


function getCategories(productsData){
    const categories = new Set();

    productsData.forEach((product)=>{
        categories.add(product.category);
    });

   return Array.from(categories);
}