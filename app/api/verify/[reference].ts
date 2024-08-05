import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

type Data = {
    success: boolean;
    data?: Object;
};

const verifyReference = async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
    const {
        query: { reference },
    } = req;

    try {
        const res = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                },
            }
        );
        const data: any = await res.json();
        resp.status(200).json({ success: true, data: data.data });
    } catch (error) {
        resp.status(400).json({ success: false });
    }
};

export default verifyReference;
