// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<any>,
) {


    const headers= {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY_BFF_WEB,
      }
    
    try {
        const request = `https://cl-ccom-easy-bff-web.ecomm-stg.cencosud.com/v1.1/shoppingcart/${_req.query.cartId}`
        const response = await axios.get(request, {headers})
        res.status(200).json(response.data)
    } catch (error) {
       res.status(400).json(error)
    }
}
