import React, { Component } from 'react';

import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
} from 'reactstrap';

const { ipcRenderer } = window.require('electron');

class NewProduct extends Component {
	
	state = {
		name: '',
		description: '',
		price: '',
		quantity: '',
	}

	handleClose = () => {
		window.close();
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		ipcRenderer.send('save-new-product', this.state);
		this.setState({
			name: '',
			description: '',
			price: '',
			quantity: '',
		});
	}

	render() {
		const {
			name,
			description,
			price,
			quantity,
		} = this.state;

    return (
			<div className="p-3">
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="product">Product</Label>
						<Input
							type="text"
							name="name"
							id="product"
							placeholder="Enter name"
							value={name}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input
							type="textarea"
							name="description"
							rows="2"
							placeholder="Enter description of the product"
							value={description}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="price">Price</Label>
						<Input
							type="text"
							name="price"
							id="price"
							placeholder="Enter price"
							value={price}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="quantity">Quantity</Label>
						<Input
							type="text"
							name="quantity"
							id="quantity"
							placeholder="Enter quantity"
							value={quantity}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<div className="text-right">
						<Button color="primary" className="mr-2">Add product</Button>
						<Button
							outline
							onClick={this.handleClose}
						>Cancel</Button>
					</div>
				</Form>
			</div>
    );
  }
}

export default NewProduct;
