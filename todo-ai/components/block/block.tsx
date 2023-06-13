import React, { createRef, useEffect } from "react";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import s from './block.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

interface BlockProps {
	id: string,

    _html: any,
    _tag: any,

	onChangeHandler: Function,

	updatePage: (block: { id: string; html: string; tag: string; }) => void,

	addBlock: (block: { id: string; ref: any; }) => void,
    removeBlock: (block: { id: string; ref: any; }) => void,
}

export default function Block({id, _html, _tag, addBlock, removeBlock, updatePage}: BlockProps) {

    const [content, setContent] = useState("")
	const [tag, setTag] = useState("p")

	const blockRef = createRef<any>()

	const sanitizeConf = {
		allowedTags: ["b", "i", "a", "p"],
		allowedAttributes: { a: ["href"] }
	};

	useEffect(() => {
		setContent(_html)
		setTag(_tag)
	}, [_html, _tag])

	function onContentChange(evt: any) {
		setContent(evt.target.value)
		updatePage({id: id, html: sanitizeHtml(evt.target.value, sanitizeConf), tag: tag})
	}

	function onKeyDown(evt: any) {
		if (evt.key === "Enter") {
			evt.preventDefault()
			addBlock({id: id, ref: blockRef.current})
		}
		if (evt.key === "Backspace" && content === "") {
			evt.preventDefault()
			removeBlock({id: id, ref: blockRef.current})
		}
	}

	return (
		<div className={s.block}>
			<input type="checkbox" className={s.checkbox} />
			<ContentEditable
				className={s.content}
				innerRef={blockRef}
				onChange={onContentChange}
				html={content} 
				tagName={tag}
				onKeyDown={onKeyDown}
			
			/>
			<FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }}/>
		</div>
	)

}