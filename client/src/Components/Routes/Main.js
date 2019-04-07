import React, { Component } from 'react'
import axios from 'axios';
import checkStatus from '../../helpers';
import CameraComponent from '../Functional/CameraComponent';
import Stickers from '../Functional/Stickers';
import Gallery from '../Functional/Gallery';

export default class Main extends Component {

	constructor() {
		super();

		this.state = {x: 0, y: 0, cleanSelection: false};
	}

	async componentDidMount() {
		const response = await axios('http://localhost:6357/auth/checkAuth');
		const {data: {success}} = await response;
		const options = {success, history: this.props.history};
		checkStatus(options);	
		this.selectedSticker = document.querySelector("#sticker");
	}

	_onMouseMove(e) {
		const {pageX, pageY} = e.nativeEvent;
		if (this.selectedSticker)
			this.selectedSticker.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
		this.setState({x:pageX, y: pageY})
	}

	_onTouchMove(e) {
		const x = e.nativeEvent.pageX;
		const y = e.nativeEvent.pageY;
		if (this.selectedSticker)
			this.selectedSticker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		this.setState({x, y});
	}

	cleanSelection = () => this.setState({cleanSelection: true});

	cleanSelectionFeedback = () => this.setState({cleanSelection: false});

	render() {
		return (
				<div 
					onMouseMove={this._onMouseMove.bind(this)} 
					style={{border:"1px solid orange"}}
					onTouchMove={this._onTouchMove.bind(this)}
				>
					<CameraComponent cleanSelection={this.cleanSelection}/>
					<Stickers cleanSelection={this.state.cleanSelection} feedback={this.cleanSelectionFeedback}/>
					<Gallery />
				</div>
		)
	}
}
