"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import s from './todo.module.scss';
import Block from "../block/block";

interface BlockItem {
    id: string,
    html: string,
    tag: string,
}

export default function Todo() {

    function uid(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const initialBlock = { id: uid(), html: "", tag: "p" };
    let [blocks, setBlocks] = useState([initialBlock])


    function addBlockHandler(currentBlock: {id: string, ref: any}) {
        console.log(currentBlock)
        let newBlock: BlockItem = { id: uid(), html: "", tag: "p" }
        let index = blocks.map((block: { id: any; }) => block.id).indexOf(currentBlock.id)
        let newBlocks = [...blocks]
        newBlocks.splice(index + 1, 0, newBlock)
        setBlocks(newBlocks)
    }


    function removeBlockHandler(currentBlock: {id: string, ref: any}) {

        if (blocks.length === 1) {return}

        let index = blocks.map((block: { id: any; }) => block.id).indexOf(currentBlock.id)
        let newBlocks = [...blocks]
        newBlocks.splice(index, 1)
        setBlocks(newBlocks)
    }

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