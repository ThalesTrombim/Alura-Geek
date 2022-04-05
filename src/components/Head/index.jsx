import Head from 'next/head';

function NextHead({ children, desc }) {
    return (
        <Head>
            <title>{ children }</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={desc} />
        </Head>
    )
}

export { NextHead }