### form表单插件 （未正式测试！！！）

```
依赖：   
        @types/lodash 
        @types/node
        @types/webpack-env
        lodash
        sass
        sass-loader
        element-plus
```

```
    注意：serverData或formSetting改变整个form会重新生成
         要改内部属性用api修改
         设计初衷；所有表单处理在配置中配置
         外部只赋初始serverData 和 取表单数据
    eg:
    <my-form
        :uploadFn="uploadFn"    //上传文件的方法 详见 img
        :showBigImageFn="showBigImageFn" //显示图片的方法
        ref="test"
        :serverData="dataRef" //服务器数据
        :formSetting="settingRef" //配置文件
        @change="changeFn" //form数据变化触发，单个元素上可以单独设置
        labelWidth="80px" //标签统一设置宽度
        :rule="rule"     //扩展的简易验证规则
    />
    
    const changeFn = (obj: any) => {
      console.log(`form Change id:${obj.id} ======================`)
      console.log(obj.formData)
    }
    
    //  eg: min:key 
    //  val:当前输入框的值
    //  ruleVal:指定的key的输入框的值
    //  label: 指定的key的label值
    // 默认rule含：required、number、min、max
    const rule = {
      test (val: any, ruleVal?: string, label?: string) {
        console.log('test in')
        return {
          pass: true,
          msg: ''
        }
      }
    }
```

```
    form的api：
    
    getData()=>any  //获取数据
    
    checkForm()=>booleam //表单检查
    
    find(key:string)=>obj //查找内部子元素，返回子元素对象
    
    checkAndGetData()=>{ //表单检查并获取数据
        pass:booleam, //表单是否验证通过
        data:any //form的数据
    }
```

```
    子元素的api: 子元素对象通过form的find接口获取
    
        getData()=>any //获取值
       
        checkFiled()=>booleam //返回验证结果
        
        setParam(obj:Object)=>void //设置元素的属性
        eg:setParam({
            options:[]
        })
        
        setValue(value:string|any)=>void //设置元素的值
        eg:setValue('1')
        
        getParam()=>any //获取元素的所有属性
```

```
控件支持：
    基础控件： type=''
        text：普通文本输入 带单位
        password：密码
        select：单选下拉
        radio：单选
        img：图片上传（多个）
        file：文件上传（单个）
        color：颜色选择器
        date：日期选择
        time：时间选择
        dateTime：日期时间选择
        button：按钮
    
    特殊控件：type=''
        group:分组 带key数据会归于key下
        repeat：重复 
        addList:添加列表
```

### 基础控件公共属性

```
    type:string,   //控件类型
    label:string,   //输入框名称
    key:string,     //输入框提交key
    when:string,    //显示条件,目前只支持单个条件  eg: when:'g=1'
    value:string|any,   //默认值
    style:string,   //样式 
    labelWidth:string, //输入框名称宽度 默认:'120px'
    rule: string', //验证简易规则 eg：required,max:group.z
    disabled:boolean, //是否可编辑
    placeholder:string,
    unit:string, //单位
    unitOption:any[], //单位选择关系 [{ value: '1', label: 'hz' }, { value: '1000', label: 'khz' }, { value: '1000000', label: 'mhz' }],
    unitAutoChangeVal: boolean, //单位选择后是否自动计算值  默认：true
    ruleFn (val: any, formData: any) {  //验证函数 返回当前值和整个form表单的值
      return {              //需要返回固定格式
        pass: (parseFloat(val) > 0),
        msg: '未通过'
      }
    },
    changeFn (val: any, formObj: any, formData: any) {  //值变换的时候 返回当前值、表单对象、表单值
      formObj.find('key').setParam({})
      formObj.find('key').setValue()
      
      console.log(val, formObj, formData)
    },
    setupFn(obj:any){   //初始化时执行 返回当前的控件对象
        obj.setParam({})
    }

```

### text、password

```
    特有属性：无
```

### select、radio

```
    特有属性：
        options:any[] //下拉选择数据
                        eg:[{ label: 'a', value: '1' }, { label: 'b', value: '2' }]
```

### img

```
    特有属性： 可在form上全局配置showBigImageFn和uploadFn，这里配置咯会覆盖全局配置
        value:string,  // 多个值逗号隔开  eg：'http://1.jpg,http://2.jpg'
        showBigImageFn (url: string) {  //点击查看大图时触发,返回点击图片地址
            console.log(url)
        },
        async uploadFn (file:File) {     //上传函数,返回文件对象
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('http://3.jpg')
                    //reject(new Error('222'))
                }, 1000)
            })
        }
```

### file

```
    特有属性：可在form上全局配置uploadFn，这里配置咯会覆盖全局配置
        async uploadFn (file:File) {     //上传函数,返回文件对象
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('http://3.jpg')
                    //reject(new Error('222'))
                }, 1000)
            })
        }
```

### date、time、dateTime

```
    特有属性：
        value:string  时间戳

```

### button

```
    特有属性：
        clickFn:(formObj: any, formData: any) => { //点击执行 返回form对象和formData数据
          console.log('button click')
          console.log(formObj, formData)
          formObj.find('a').setValue('2')
        }
```

### group

```
        type:'group',
        label:string, 组名
        key:string,  分组key，有key 的时候里面的子集数据会在key值下面
        style:string,
        when:string,
        childrem:[
            ...其他所有控件
        ]
```

### repeat

```
    type:'repeat',
    key: string,
    style: string,
    when:string,
    repeatBy: string, //重复次数所关联的key
    children: []    //...其他所有控件
```

### addList （自定义组件）

```
    type: 'addList',
    key: string,
    pagination: boolean, //是否显示分页
    height: number, //控件table高度 默认：200
    when:string,
    pageSize: number,//分页数  默认：10
                //由于生成的list有可能是动态select生成，所以数据带label,value，label用于显示，value为实际值
    value: [],  //eg: [{a:{label:'',value:''},...},...]
    style: string,
    inputs:[] //添加列表的元素 同group的children
```
