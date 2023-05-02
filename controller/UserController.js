import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getUser = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await User.count({
        where: {
            [Op.or] : [{name:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await User.findAll({
        where: {
            [Op.or] : [{name:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id','DESC']
        ]
    });
    res.json({
        page: page,
        limit: limit,
        totalPage: totalPage,
        totalRows: totalRows,
        result: result
    });
} 