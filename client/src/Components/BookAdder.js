import React, {useState} from "react";
import bookimg from "../imgs/books.png";
import booky from "../imgs/book.png";
import BookShelf from "./Bookshelf";
import Axios from "axios";

function BookAdder() {
	let input;
	
	// State hooks for animation and counter
	const [animate,setAnimate] = useState('');
	const [count, setCount] = useState(0)

	// Event handler to the add book to the database
	const saveToDB = (e) => {
		e.preventDefault();
		animateOn();
		setCount(count+1)
		Axios.post("/api/library/", { title: input })
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		e.target.reset()
		input = '';
	};
	// Event handler to receive user input
	const userInput = (e) => {
		input = e.target.value;
	};
	// Event handler to turn animation on
	const animateOn = () => {
		setAnimate('ld ld-grow-rtl-out');
		
	}
	// Event handler to turn animation off
	const animateOff = () => {
		setAnimate('ld');
		
	}
	// Render book adder component
	return (
		<div id='sw'>
			<h1  id='heading'>Personal Library</h1>
			<img id='heading-img' alt="BookShelf" src={bookimg} />
			<div className="container-fluid" id="add">
				<h3>Add a new book to the library</h3>
				<form onSubmit={saveToDB}>
					<input
						onInput={userInput}
						className="form-control"
						type="text"
						placeholder="Enter Title..."
					/>
					<button type="submit" onMouseOut={animateOff} className="btn btn-outline-success btn-block">
						Add Book!
						<img className={animate} id='bk' alt="book" src={booky} />
					</button>
				</form>
			</div>
			<BookShelf count={count}/>
		</div>
	);
}

export default BookAdder;
