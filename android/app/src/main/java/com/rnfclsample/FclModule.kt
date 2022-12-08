package com.rnfclsample

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.portto.fcl.Fcl
import com.portto.fcl.model.Result
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class FclModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "FclModule"

    @ReactMethod
    fun login(promise: Promise) {
        val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)
        scope.launch {
            when (val result = Fcl.login()) {
                is Result.Success -> {
                    promise.resolve(result.value)
                }
                is Result.Failure -> {
                    promise.reject(result.throwable)
                }
            }
        }
    }
}