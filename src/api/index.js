import { URL_BACK, URL_SD } from "./config.js";
import { img2img1 } from "./const.js";
import request from "./request.js";
export { URL_BACK, URL_SD };
// /images/
// /images/?tag=标签名称
// /images/?order_by=time
// /images/?order_by=views
// /images/?search=text

// post data必须为对象，否则发不出请求
export function get_points_by_check(data) {
  return request.post("/get_points_by_check", data);
}
export function faceSwap(data) {
  return request.post("/queue-process", data);
}
export function getSwapQueueResult(data) {
  return request.post("/query-result", data);
}
export function wechat_login(data) {
  return request.post("/wechat_login", data);
}
export function get_user(data) {
  return request.post("/get_user", data);
}
export function get_all_images() {
  return request.get("/get-all-images");
}
export function delete_all_images(data) {
  return request.post("/delete-all-images", data);
}
export function delete_select_images(data) {
  return request.post("/delete-select-images", data);
}
export function getPhotoData(data) {
  return request.post("/sdapi/v1/query-photo-image-sql-data-by-dict", data);
}
export function getPhotoPath(path) {
  return request.post(`/list-files?path=${encodeURIComponent(path)}`);
}

/* 可通过字典查询UserSqlData数据
@data(dict):可选匹配特征：
            user_id             = Integer
            main_image_path     = String
            roop_image_path     = String
            output_image_path   = String
            created_at          = DateTime
            befor_process_time  = Float
            process_time        = Float
            image_type          = String
            request_id          = String
            request_status      = String
*/
export function QueryUserDataAPI(data) {
  return request.post("/query-user-process-data", data);
}
export function QueryUserInfoAPI(data) {
  return request.post("/query-user-info", data);
}
export function QueryUserPcocessDataAPI(data) {
  return request.post("/query-user-process-data", data);
}
export function get_user_info(data) {
  return request.post("/users", data);
}
export function get_pending_tasks_on_user(user_id) {
  return request.post("/get_pending_tasks_on_user/" + user_id + "/");
}
export function checkTaskStatus(user_id) {
  return request.get("/check_task_status/" + user_id + "/");
}
export function checkTaskStatusByTaskId(taskId) {
  return request.get("/check_task_status_on_taskid/" + taskId + "/");
}

// SD
export function getConfig(data) {
  return request.get("/config", data, {
    isMj: true,
  });
}
export function txt2img(data) {
  return request.post("/sdapi/v1/txt2img", data);
}
export function img2img(data) {
  return request.post("/sdapi/v1/img2img", img2img1);
}

/**
 * 全局信息
 */
export function getCmdFlags(data) {
  return request.get("/sdapi/v1/cmd-flags", data);
}

/**
 * 获取模型
 */
export function getSdModels(data) {
  return request.get("/sdapi/v1/sd-models", data);
}
/**
 * 获取模板
 */
export function getSdLoRA(data) {
  return request.get(
    "/file=extensions/a1111-sd-webui-tagcomplete/tags/temp/lora.txt",
    data
  );
}
/**
 * 获取采样方法
 */
export function getSdSamplers(data) {
  return request.get("/sdapi/v1/samplers", data);
}
/**
 * 文生图
 */
export function postTxt2img(data) {
  return request.post("/sdapi/v1/txt2img", data);
}
/**
 * 图生文
 */
export function postPreprocess(data) {
  return request.post("/sdapi/v1/preprocess", data);
}
/**
 * 解析文本结果
 */
export function getAnalysRes(fileDir, name) {
  return request.get(`/file=${fileDir}/${name}.txt`);
}
