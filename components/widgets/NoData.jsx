import React from 'react'
import noDataAnimation from "../../public/lotties/no-data.json";
import Lottie from "lottie-react";

function NoData({ message, backComponent = null }) {
    return (
        <div className="card p-5 flex flex-col justify-center items-center py-12">
            <Lottie animationData={noDataAnimation} size={300} />
            <h1 className="text-lg text-gray-500 mt-5 max-w-xs text-center mb-3">
                {message}
            </h1>
            {backComponent ? backComponent : null}
        </div>
    )
}

export default NoData