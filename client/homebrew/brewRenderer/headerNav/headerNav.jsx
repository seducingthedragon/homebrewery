require('./headerNav.less');

import * as React from 'react';
import * as _ from 'lodash';


const HeaderNav = React.forwardRef(({}, pagesRef)=>{

	const [state, setState] = React.useState({
		showHeaderNav : false
	});

	const toggleHeaderNav = ()=>{
		setState((prevState)=>({
			...prevState,
			showHeaderNav : !prevState.showHeaderNav
		}));
	};

	const renderHeaderLinks = ()=>{
		if(!pagesRef.current) return;
		const elements = pagesRef.current.querySelectorAll('[id]');
		if(!elements) return;
		const navList = [];

		elements.forEach((el)=>{
			if(el.className.match(/\bpage\b/)) {
				navList.push({
					depth : 0,
					text  : `Page ${el.id.slice(1)}`,
					link  : el.id
				});
				return;
			}
			if(el.localName.match(/^h[1-6]/)){
				navList.push({
					depth : el.localName[1],
					text  : el.innerText,
					link  : el.id
				});
				return;
			}
			navList.push({
				depth : 7,
				text  : el.innerText,
				link  : el.id
			});
		});

		return _.map(navList, (navItem, index)=>{
			return <HeaderNavItem text={navItem.text} link={navItem.link} depth={navItem.depth} index={index} />;
		});

	};

	return <div className={`headerNav ${state.showHeaderNav ? 'active' : ''}`}>
		<i
			className={`navIcon ${state.showHeaderNav ? 'active fa-solid' : 'fa-regular'} fa-rectangle-list`}
			onClick={toggleHeaderNav}
			title='Navigate by Header'
		></i>
		{state.showHeaderNav && renderHeaderLinks()}
	</div>;
}
);

const HeaderNavItem = ({ index, link, text, depth })=>{
	return <p key={index}>
		<a href={`#${link}`} target='_self'>{`${'-'.repeat(depth)}${text}`}</a>
	</p>;
};

export default HeaderNav;