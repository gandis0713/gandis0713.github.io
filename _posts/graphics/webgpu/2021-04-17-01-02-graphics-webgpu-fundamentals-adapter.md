---
layout: post
title: "<code>[WebGPU]</code> <br> [Draft] WebGPU Fundamentals - Adapter"
subtitle: 'WebGPU Fundamentals - Adapter'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGPU
  - Adapter
---

### **Adapters**
Adapter는 WebGPU의 Core Internal Objects로 분리되는 두가지 Internal Object(Adapter, Device)중 한 가지 이다. WebGPU에는 수 많은 internal Object들이 존재하지만, Adpater가 Core Internal Object로 분리된 이유는 GPU 동작에 핵심적인 역할을 하기 때문이지 않을까 생각된다. 

[WebGPU - Adapters](https://gpuweb.github.io/gpuweb/#adapters)에서는 Adapter가 아래의 2가지 역할을 담당하고 있는 것으로 설명하고 있다.
 - 브라우저의 기반이 되는 Platform(OS)에서 제공하는 컴퓨팅(computing), 렌더링(Rendering) 기능의 인스턴스(Instance)를 식별한다.
 - 컴퓨팅, 렌더링 기능위에 WebGPU를 구현한 브라우저의 인스턴스를 식별한다.


브라우저가 실행되는 여러 플렛폼(Apple, Linux, Windows)들은 GPU에 접근하기 위한 그래픽 API를 별도로 제공한다. Linux의 경우, WebGPU는 기본적으로 vulkan을 그래픽 API로 선택한다. vulkan은 초기화 시에 필요한 여러가지 객체를 생성하고, 그래픽 물리적 장치(Physical Device)를 찾는다. 그리고 그래픽 물리적 장치 정보로 부터 사용자가 필요로 하는 기능에 접근할 논리적 장치(Logical Device)를 생성하게 된다.

즉, WebGPU에서 vulkan을 그래픽 API로 선택할 경우, Adapter는 vulkan의 물리적 장치 객체를 통해 플렛폼에서 지원하는 기능을 파악하고 논리적 장치를 생성하는 역할을 하게 된다.

WebGPU가 구현되어 있는 Google의 'Dawn' Source Code를 보면, vulkan용 Adapter의 경우 생성자에서 VkPhysicalDevice를 paramter로 전달받는 것을 확인 할 수 있다.

[Source Code Link](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/dawn_native/vulkan/AdapterVk.cpp#25)
~~~cpp
namespace dawn_native { namespace vulkan {
    Adapter::Adapter(Backend* backend, VkPhysicalDevice physicalDevice)
        : AdapterBase(backend->GetInstance(), wgpu::BackendType::Vulkan),
          mPhysicalDevice(physicalDevice),
          mBackend(backend) {
    }
    ...
}
~~~

그리고 논리적 장치(Logical Device)를 생성할 때, 내부적으로 VkPhysicalDevice객체를 통해 지원하는 Feature들을 확인한 후 생성하는 것으로 확인된다.

[Source Code Link](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/dawn_native/Adapter.cpp#121)
~~~cpp
void AdapterBase::RequestDevice(const DeviceDescriptor* descriptor,
                                WGPURequestDeviceCallback callback,
                                void* userdata) {
    DeviceBase* result = nullptr;
    MaybeError err = CreateDeviceInternal(&result, descriptor);
    ...
}

MaybeError AdapterBase::CreateDeviceInternal(DeviceBase** result,
                                             const DeviceDescriptor* descriptor) {
    if (descriptor != nullptr) {
        for (const char* featureStr : descriptor->requiredFeatures) {
            ...
            DAWN_INVALID_IF(!mSupportedFeatures.IsEnabled(featureEnum),
                            "Requested feature %s is disabled.", featureStr);
        }
    }
    ...
}
~~~

Adapter사용을 위한 자세한 Spec은 [WebGPU - Adapters](https://gpuweb.github.io/gpuweb/#adapters)를 참고한다.

---

### **Reference**
 - https://gpuweb.github.io/gpuweb/#adapters

---

> 이 글은 [WebGPU](https://gpuweb.github.io/gpuweb/)에 정의된 Spec을 바탕으로 작성되었다. 이 글을 작성하는 시점에 [WebGPU](https://gpuweb.github.io/gpuweb/)는 Draft문서로 아직 공식적으로 Publish되지는 않았다. 따라서 이 글을 읽는 시점에 WebGPU의 Spec이 변경되었을 수 있다. 또한 잘못된 이해로 정확하지 않은 내용이 포함되어 있을 수 있다.