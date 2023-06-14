"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import s from './todo.module.scss';
import Block from "../block/block";
import uid from "@/utils/uid";

interface BlockItem {
    id: string,
    html: string,
    tag: string,
}

export default function Todo() {
    
    const initialBlock: BlockItem = { id: "0000", html: "", tag: "p" };
    let [blocks, setBlocks] = useState<Array<BlockItem>>([initialBlock])
    let [currentBlock, setCurrentBlock] = useState<BlockItem>(initialBlock)

    function addBlockHandler(currentBlock: {id: string, ref: any}) {
        console.log(currentBlock)
        let newBlock: BlockItem = { id: uid(), html: "", tag: "p" }
        let index = blocks.map((block: { id: any; }) => block.id).indexOf(currentBlock.id)
        let newBlocks = [...blocks]
        newBlocks.splice(index + 1, 0, newBlock)
        setBlocks(newBlocks)
        setCurrentBlock(newBlock)
    }


    function removeBlockHandler(currentBlock: {id: string, ref: any}) {
        console.log(currentBlock)
        if (blocks.length === 1) {return}

        let index = blocks.map((block: { id: any; }) => block.id).indexOf(currentBlock.id)
        let newBlocks = [...blocks]
        newBlocks.splice(index, 1)
        setBlocks(newBlocks)
        setCurrentBlock(newBlocks[index - 1])
    }

    useEffect(() => {
        //focus on the last block
        console.log("focus on the last block", currentBlock)
        let currentBlockRef = document.getElementById(currentBlock.id)        
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(currentBlockRef as HTMLElement);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
        currentBlockRef?.focus();
        range.detach(); // optimization

    }, [currentBlock])


    function updatePageHandler(updatedBlock: {id: string, html: string, tag: string}) {
        let index = blocks.map((block: { id: any; }) => block.id).indexOf(updatedBlock.id)
        let newBlocks = [...blocks]
        newBlocks[index] = updatedBlock
        setBlocks(newBlocks)
    }

    return <div className={s.todo}>
        
        <div className={s.blocks}>
            {blocks.map((block, i) => {
                return <div key={block.id} className={s.block}>
                    <Block
                        id={block.id} 
                        _html={block.html}
                        _tag={block.tag}
                        addBlock={addBlockHandler}
                        removeBlock={removeBlockHandler} 
                        updatePage={updatePageHandler}
                        onChangeHandler={() => {}}
                    />
                </div>
            }
            )}
        </div>

    </div>;
}