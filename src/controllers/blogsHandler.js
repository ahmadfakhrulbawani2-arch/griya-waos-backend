import normalizeJson from "../middlewares/normalizeJson.js";
import {
  blogsMetadataController,
  getAllBlogsController,
  getBlogByIdController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} from "../model/blogsModel.js";
import handleResponse from "../routes/handleResponse.js";

export const getAllBlogs = async (req, res, next) => {
  const pageReq = parseInt(req.query.page) || 1;
  const limitReq = parseInt(req.query.limit) || 10;

  try {
    const [blogs, total] = await Promise.all([
      getAllBlogsController(pageReq, limitReq),
      blogsMetadataController(),
    ]);

    const totalPage = Math.ceil(total / limitReq);
    if (pageReq > totalPage && totalPage !== 0) {
      handleResponse(res, 404, "Accessing out of range page");
      return;
    }

    handleResponse(res, 200, "Blogs fetched successfully", blogs, {
      total_data: total,
      total_page: Math.ceil(total / limitReq),
      limit: limitReq,
      page: pageReq,
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await getBlogByIdController(id);
    handleResponse(res, 200, "Blog fetched successfully", blog);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  const payload = normalizeJson(req.body);
  const userId = req.user.id;
  payload.user_id = userId;

  try {
    const blog = await createBlogController(payload);
    handleResponse(res, 201, "Blog created successfully", blog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  const payload = normalizeJson(req.body);
  const userId = req.user.id;
  payload.user_id = userId;

  const id = req.params.id;
  try {
    const blog = await updateBlogController(id, payload);
    handleResponse(res, 200, "Blog updated successfully", blog);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await deleteBlogController(id);
    handleResponse(res, 200, "Blog deleted successfully", blog);
  } catch (err) {
    next(err);
  }
};
