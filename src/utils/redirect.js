
import router from "../router";
import { getCustomerById } from "@/api/customer";
import store from "../store";
export function jumpToStep() {
    getCustomerById(JSON.parse(sessionStorage.getItem("session")).id).then(res => {
        store.commit("setSession", res);
        if (res.process) {
            if (res.process.step === 0 && res.process.status == 10) {
                router.push({
                    name: "SubmitIdentify",
                    params: { taskId: res.process.taskId }
                });
            }
            if (res.process.step === 1 && res.process.status == 20) {
                router.push({
                    name: "Home",
                    params: {}
                });
            }
            if (res.process.step === 1 && res.process.status > 20) {
                router.push({
                    name: "SubmitOrderNo",
                    params: { taskId: res.process.taskId }
                });
            }
            if (res.process.step === 2 && res.process.status > 20) {
                router.push({
                    name: "SubmitOrderPic",
                    params: { taskId: res.process.taskId }
                });
            }
        } else {
            router.push({
                name: "Home",
                params: {}
            });
        }
    })

}



