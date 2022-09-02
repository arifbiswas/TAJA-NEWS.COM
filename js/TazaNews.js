const loadCategory = async () => {
    const url ='https://openapi.programming-hero.com/api/news/categories'
    const respons = await fetch(url);
    const data = await respons.json();
    return data.data.news_category;
}

const categoryDisplay = async () => {
    const categorys = await loadCategory();
    // console.log(category);

    const categoryContainer = document.getElementById('category-container');
    categoryContainer.textContent = "";

    categorys.forEach(category => {
    
        const { category_id, category_name } = category;
        // console.log(category_id,category_name);

        
        const childDiv = document.createElement('div');
        childDiv.classList.add('category')
        childDiv.innerHTML = `
        <button>${category_name}</button>
        `
        categoryContainer.appendChild(childDiv);

    });
}

categoryDisplay()

// (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0: {category_id: '01', category_name: 'Breaking News'}
// 1: {category_id: '02', category_name: 'Regular News'}
// 2: {category_id: '03', category_name: 'International News'}
// 3: {category_id: '04', category_name: 'Sports'}
// 4: {category_id: '05', category_name: 'Entertainment'}
// 5: {category_id: '06', category_name: 'Culture'}
// 6: {category_id: '07', category_name: 'Arts'}
// 7: {category_id: '08', category_name: 'All News'}