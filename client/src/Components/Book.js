import React, { useState } from "react";
import deleteImg from "../imgs/trash.png";
import Axios from "axios";

function Book(props) {
    let userInput;
    
	// Destructuring props
	const { book } = props;
    const { title, review, _id } = book;
    
	// State hooks for adding review and animation
	const [r, setR] = useState("No Review at this time.");
    const [animate, setAnimate] = useState("");
    
	// Event handler to receive user input
	const input = (e) => {
		userInput = e.target.value;
    };
    
	// Event handler to turn animation on
	const animateOn = () => {
		setAnimate("ld ld-jingle infinte");
    };
    
	// Event handler to turn animation off
	const animateOff = () => {
		setAnimate("");
    };
    
	// Event handler to add a review to a book
	const addReview = (e) => {
		e.preventDefault();
		Axios.post("/api/library/bookreview" + _id, {
			review: userInput,
		})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		setR(userInput);
		e.target.reset();
    };
    
	// Event handler to delete a book
	const deleteBook = () => {
		Axios.delete("/api/library/" + _id)
			.then((data) => console.log("Success"))
			.catch((err) => console.log(err));
		window.location.reload();
    };
    
	// Render book component
	return (
		<div className="container" id="book">
			<h3>{title}</h3>
			<p id="g">{review || r}</p>
			<form onSubmit={addReview}>
				<span>
					<input id="x" value={userInput} onInput={input} type="text" />
					<button className="btn btn-outline-success">Add Review</button>
				</span>
			</form>
			<button
				onMouseOver={animateOn}
				onMouseOut={animateOff}
				type="button"
				onClick={deleteBook}
				className="btn btn-outline-danger"
				id="delete"
			>
				Delete Book
				<img className={"m-0 " + animate} alt="trashcan" src={deleteImg} />
			</button>
		</div>
	);
}

export default Book;
