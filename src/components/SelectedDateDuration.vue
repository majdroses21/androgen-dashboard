<template>
    <div class="mb-2 box-modal gap-3">
        <div style="width: 100%;">
            <label class="label-style" for="lesson-name">{{$t('Day of week')}}</label>
            <select class="select-style-modal input-style" :value="select_day" @input="$emit('update:select_day', $event.target.value)">
                <option :value="index+1" v-for="(day,index) in days" :key="index">{{ day }}</option>
            </select>
            <div v-if="validation_var == 'generate'" v-for="(item, index) in v$.select_day.$errors" :key="index" class="error-msg mx-1 gap-1">
                <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                </div>
                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
            </div>
        </div>
        <div style="width: 100%;">
            <label class="label-style" for="time">{{$t('Time')}}</label>
            <input :value="generate_time" @input="$emit('update:generate_time', $event.target.value)" type="time" class="input-style" id="time" name="time">
            <div v-if="validation_var == 'generate'" v-for="(item, index) in v$.generate_time.$errors" :key="index" class="error-msg mx-1 gap-1">
                <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                </div>
                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
            </div>
        </div>
        <div style="width: 100%;">
            <label class="label-style" for="generate_duration" style="text-wrap:nowrap;">{{$t('Duration (Minutes)')}}</label>
            <input :value="generate_duration" @input="$emit('update:generate_duration', $event.target.value)" type="number" class="input-style" id="generate_duration" name="generate_duration" min="0" :placeholder="$t('Duration')">
            <div v-if="validation_var == 'generate'" v-for="(item, index) in v$.generate_duration.$errors" :key="index" class="error-msg mx-1 gap-1">
                <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                </div>
                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { _t } from '../helpers';

export default {
    setup() {
        return { 
            v$: useVuelidate()
        }
    },
    data(){
        return{
            days:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
        }
    },
    props: ['generate_duration','generate_time','select_day','validation_var','vuelidateExternalResultsDuration'],
        
    emits: ['update:generate_duration', 'update:generate_time', 'update:select_day'],
    
    validations() {
        if( this.validation_var =='generate' ){
            var positive_number = (value) => value > 0;
            return {
                generate_duration:{
                    positive_number: helpers.withMessage('The lessons count must be greater than 0', positive_number),
                    required: helpers.withMessage('_.required.duration', required) ,
                },
                generate_time:{required: helpers.withMessage('_.required.time', required)},
                select_day: { required: helpers.withMessage('_.required.day', required) },
            }
        }
    },
    methods:{
        _t(message){return _t(message, this.$t);},
    }
}
</script>

<style scoped>
    .label-style {
        display: block;
        margin: auto;
        position: relative;
        margin-bottom: 4px;
        margin-left: 0px;
    }
    .input-style {
        padding-inline: 16px;
        border-radius: 8px;
    }
    .select-style-modal:deep() .vs__dropdown-toggle {
        border: none !important;
    }
    .select-style-modal:deep() .vs__search {
        margin-top: 0px;
    }
    .select-style-modal :deep()::placeholder {
        color: #d9d9d9;
    }
    .select-style-modal :deep() .v-select{
        max-height: 42.6px !important;
        height: 42.6px!important;
        padding-top: 7px;
        padding-bottom: 7px;
    }
    .select-style-modal :deep() .vs__dropdown-option--highlight {
        background-color: var(--primary-color) !important;
    }

    .select-style-modal :deep() .vs__dropdown-menu {
        border-radius: 8px;
        margin-top: 9px;
    }
</style>