// Создание шаблона для продукта (в нашем случае книги)
interface Book {
    id: number,
    title: string,
    author: string,
    year: number,
    isAvailable: boolean
}

// Аналог базы данных
const dataBase: Book[] = [];

// Тест Git
const test: string = "Тут ничего нет";
// Внешний API (Чтобы придерживаться SOLID у BookCRUD)
function correctingID(): void {
    const idStorage: number[] = [];
    for(const data of dataBase) {
        idStorage.push(data.id);
    }

    const correctedIdStorage: number[] = [];
    for(let i = 0; i < idStorage.length; i++) {
        correctedIdStorage.push(i);
    }

    for(let i = 0; i < dataBase.length; i++) {
        const elementData = dataBase[i];
        const correctedId = correctedIdStorage[i];

        if(elementData && correctedId !== undefined) {
            elementData.id = correctedId;
        }
    }
}

// JS не имеет встроенного метода для принятия данных из консоли,
// externalValue и innerExternalValue служат, как значения которые были получены из вне,
// для работы с изменением данных.
const externalValue: string = "title";
const innerExternalValue: unknown = "Книга 404";

// API на базе ООП
class BookCRUD {
    addBook(title: string, author: string, year: number, isAvailable: boolean): void {
        //Генерация ID
        let idNumb: number = 0;
        for(const data of dataBase) {
            idNumb = data.id + 1;
        }

        // Создание книги по полученным данным
        let newBook: Book = {
            id: idNumb,
            title: title,
            author: author,
            year: year,
            isAvailable: isAvailable
        }

        // Добавление книги в базу данных
        dataBase.push(newBook);
    }

    removeBook(id: number): void {
        for(const book of dataBase) {
            if(book.id === id) {
                dataBase.splice(id, 1);
            }
        }
        correctingID();
    }

    updateBook(id: number): void {
        const neededBook: Book[] = [];
        for(const data of dataBase) {
            if(data.id === id) {
                neededBook.push(data);
            }
        }

        if(neededBook.length === 0) {
            console.log("Данную книгу нельзя изменить, её не существует!");
        }

        function changeTitle(newTitle: string) {
            for(const book of dataBase) {
                if(book.id === id) {
                    book.title = newTitle;
                }
            }
        }
        function changeAuthor(newAuthor: string) {
            for(const book of dataBase) {
                if(book.id === id) {
                    book.author = newAuthor;
                }
            }
        }
        function changeYear(newYear: number) {
            for(const book of dataBase) {
                if(book.id === id) {
                    book.year = newYear;
                }
            }
        }
        function changeAvailable(newAvailable: boolean) {
            for(const book of dataBase) {
                if(book.id === id) {
                    book.isAvailable = newAvailable;
                }
            }
        }
        
        for(const book of dataBase) {
            if(book.id === id) {
                switch (externalValue) {
                    case "title":
                        if(typeof innerExternalValue === "string") {
                            changeTitle(innerExternalValue);
                        }
                        break;
                    case "author":
                        if(typeof innerExternalValue === "string") {
                            changeAuthor(innerExternalValue);
                        }
                        break;
                    case "year":
                        if(typeof innerExternalValue === "number") {
                            changeYear(innerExternalValue);
                        }
                        break;
                    case "isAvailable":
                        if(typeof innerExternalValue === "boolean") {
                            changeAvailable(innerExternalValue);
                        }
                        break;                                                     
                }
            }
        }
    }

    detailBook(id: number): void {
        const neededBook: Book[] = [];
        for(const data of dataBase) {
            if(data.id === id) {
                neededBook.push(data);
            }
        }

        if(neededBook.length === 0) {
            console.log("Данную книгу нельзя просмотреть, её не существует!");
        }

        for(const book of neededBook) {
            console.log(`
                ID: ${book.id}
                Title: ${book.title}
                Author: ${book.author}
                Year: ${book.year}
                Available: ${book.isAvailable}
            `);
        }
    }
}

// Проверки
const api = new BookCRUD;
api.addBook("Преступление и наказание", "Фёдор Достоевский", 1866, true);
api.addBook("Война и мир", "Лев Толстой", 1869, true);
api.addBook("Мастер и Маргарита", "Михаил Булгаков", 1967, true);
api.addBook("1984", "Джордж Оруэлл", 1949, true);

api.removeBook(0);
api.updateBook(0);

dataBase.map((item) => console.log(item));

api.detailBook(0);