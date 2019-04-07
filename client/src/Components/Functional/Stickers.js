import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {Paper} from '@material-ui/core';


class Sticker extends Component {
	constructor(props) {
		super(props);
		const home = document.querySelector("#sticker");
		const elemRef = React.createElement('img', 
																	{
																		src: props.image,
																		key:"sticker",
																	});
		const container = React.createElement('div', {"data-name":props.image}, [elemRef]);
		this.state  = {
			image: props.image,
			home,
			container
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.image !== this.state.image ) {
			const elemRef = React.createElement('img', 
			{
				src: nextProps.image,
				key:"sticker",
			});
			const container = React.createElement('div', {"data-name":nextProps.image}, [elemRef]);
			this.setState({image: nextProps.image, container});
		}
		
		if (nextProps.cleanSelection)
			this.cleanout(nextProps.feedback);
	}

	cleanout(feedback) {
		feedback();
		this.setState({container: undefined});
	}

	render() {
		const {container, home} = this.state;
		return ReactDOM.createPortal(container, home);
	}

}

export default class Stickers extends Component {
	
	constructor() {
		super();

		const stickersPath = [
			'/stickers/sticker1.png',
			'/stickers/sticker2.png',
			'/stickers/sticker3.png',
			'/stickers/sticker4.png',
			'/stickers/sticker5.png',
		];
		const stickerElems = stickersPath.map((sticker, index) => 
		<div
				className="sticker"
				key={index}
				onClick={() => this.selectSticker(sticker)}
		>
			<img src={sticker} alt="sticker" />
		</div>
		)

		this.state = {
			stickers: stickerElems,
		}
	}

	selectSticker = (sticker) => {
		this.setState({selectedSticker: sticker});
	}


	render() {
		const {stickers, selectedSticker} = this.state;
		const {cleanSelection, feedback} = this.props;
		return (
			<Paper className="stickerWrapper">	
					{stickers}
					{selectedSticker ? 
					<Sticker image={selectedSticker} cleanSelection={cleanSelection} feedback={feedback}/> : null }
			</Paper>			
		)
	}
}
