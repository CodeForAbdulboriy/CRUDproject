// Аналог базы данных
const dataBase = [];
// Внешний API (Чтобы придерживаться SOLID у BookCRUD)
function correctingID() {
    const idStorage = [];
    for (const data of dataBase) {
        idStorage.push(data.id);
    }
    const correctedIdStorage = [];
    for (let i = 0; i < idStorage.length; i++) {
        correctedIdStorage.push(i);
    }
    for (let i = 0; i < dataBase.length; i++) {
        const elementData = dataBase[i];
        const correctedId = correctedIdStorage[i];
        if (elementData && correctedId !== undefined) {
            elementData.id = correctedId;
        }
    }
}
// JS не имеет встроенного метода для принятия данных из консоли,
// externalValue и innerExternalValue служат, как значения которые были получены из вне,
// для работы с изменением данных.
const externalValue = "title";
const innerExternalValue = "Книга 404";
// API на базе ООП
class BookCRUD {
    addBook(title, author, year, isAvailable) {
        //Генерация ID
        let idNumb = 0;
        for (const data of dataBase) {
            idNumb = data.id + 1;
        }
        // Создание книги по полученным данным
        let newBook = {
            id: idNumb,
            title: title,
            author: author,
            year: year,
            isAvailable: isAvailable
        };
        // Добавление книги в базу данных
        dataBase.push(newBook);
    }
    removeBook(id) {
        for (const book of dataBase) {
            if (book.id === id) {
                dataBase.splice(id, 1);
            }
        }
        correctingID();
    }
    updateBook(id) {
        const neededBook = [];
        for (const data of dataBase) {
            if (data.id === id) {
                neededBook.push(data);
            }
        }
        if (neededBook.length === 0) {
            console.log("Данную книгу нельзя изменить, её не существует!");
        }
        function changeTitle(newTitle) {
            for (const book of dataBase) {
                if (book.id === id) {
                    book.title = newTitle;
                }
            }
        }
        function changeAuthor(newAuthor) {
            for (const book of dataBase) {
                if (book.id === id) {
                    book.author = newAuthor;
                }
            }
        }
        function changeYear(newYear) {
            for (const book of dataBase) {
                if (book.id === id) {
                    book.year = newYear;
                }
            }
        }
        function changeAvailable(newAvailable) {
            for (const book of dataBase) {
                if (book.id === id) {
                    book.isAvailable = newAvailable;
                }
            }
        }
        for (const book of dataBase) {
            if (book.id === id) {
                switch (externalValue) {
                    case "title":
                        if (typeof innerExternalValue === "string") {
                            changeTitle(innerExternalValue);
                        }
                        break;
                    case "author":
                        if (typeof innerExternalValue === "string") {
                            changeAuthor(innerExternalValue);
                        }
                        break;
                    case "year":
                        if (typeof innerExternalValue === "number") {
                            changeYear(innerExternalValue);
                        }
                        break;
                    case "isAvailable":
                        if (typeof innerExternalValue === "boolean") {
                            changeAvailable(innerExternalValue);
                        }
                        break;
                }
            }
        }
    }
    detailBook(id) {
        const neededBook = [];
        for (const data of dataBase) {
            if (data.id === id) {
                neededBook.push(data);
            }
        }
        if (neededBook.length === 0) {
            console.log("Данную книгу нельзя просмотреть, её не существует!");
        }
        for (const book of neededBook) {
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
const api = new BookCRUD;
api.addBook("Книга 1", "Абдул", 2026, true);
api.addBook("Книга 2", "Абдул", 2026, true);
api.addBook("Книга 3", "Абдул", 2026, true);
api.addBook("Книга 4", "Абдул", 2026, true);
api.removeBook(0);
api.updateBook(0);
dataBase.map((item) => console.log(item));
api.detailBook(0);
export {};
//# sourceMappingURL=app.js.map