<template>
    <div class="mb-2 box-modal gap-3">
        <div style="width: 100%;">
            <label class="label-style" for="lesson-name">{{$t('Day of week')}}</label>
            <v-select class="select-style-modal input-style" :options="days" v-model="select_day" :placeholder="$t('Choose teacher')"></v-select>
        </div>
        <div style="width: 100%;">
            <label class="label-style" for="time">{{$t('Time')}}</label>
            <input v-model="time" type="time" class="input-style" id="time" name="time">
        </div>
        <div style="width: 100%;">
            <label class="label-style" for="generate_lesson" style="text-wrap:nowrap;">{{$t('Duration (Minutes)')}}</label>
            <input v-model="generate_lesson" type="time" class="input-style" id="generate_lesson" name="generate_lesson" :placeholder="$t('Duration')">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            generate_lesson:'',
            time_generate:'',
            select_day:'',
            days:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',],
        }
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