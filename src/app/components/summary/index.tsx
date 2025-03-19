'use client'

import { reatomComponent } from "@reatom/npm-react"
import { fullDataUnwrapped, generateResume } from "@/app/model/data";
import { useEffect } from "react";
import { spawn } from "@reatom/framework";
const Summary = reatomComponent(({ctx}) => {
    const data = ctx.spy(fullDataUnwrapped);
    console.log(data);

    useEffect(() => {
        spawn(ctx, (spawnCtx) => {generateResume(spawnCtx)})
    },
    [])

    if(ctx.spy(generateResume.pendingAtom) > 0) return <div className="h1">...Loading</div>

    return (
        <div>
            <h2>Summary</h2>
            <pre>{ctx.spy(generateResume.dataAtom)}</pre>
        </div>
    )
})

export default Summary;
