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

	const blockRef: any = createRef()

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

	function fixCursorPosition(e: React.FocusEvent<HTMLDivElement, Element>) {


		const range = document.createRange();

/* 		console.log("fixCursorPosition", ref)

		const range = document.createRange();
		const sel = window.getSelection();
		range.selectNodeContents(ref as HTMLElement);
		range.collapse(false);
		sel?.removeAllRanges();
		sel?.addRange(range);
		ref?.focus();
		range.detach(); // optimization */

	}

	return (
		<div className={s.block}>
			<input type="checkbox" className={s.checkbox} />
			<ContentEditable
				id={id}
				className={s.content}
				innerRef={blockRef}
				onChange={onContentChange}
				html={content} 
				tagName={tag}
				onKeyDown={onKeyDown}
				onFocus={(e) => {fixCursorPosition(e)}}
				/* onFocus={(e: any)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} */
			/>
			<FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }}/>
		</div>
	)

}