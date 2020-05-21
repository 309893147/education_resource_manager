
<template>
    <div>
        <div class="container">
            <List
                :dataUrl="'/log/login'"
                ref="list"
            >
                <!-- <template slot="filter-prefix" class="display_flex">
                    <ticketSearch
                        class="m-r-20"
                        :metaUrl="'log/meta'"
                        @communityId="onCommunityChange"
                        @filters="onFiltersChnage"
                    ></ticketSearch>
                </template> -->
            </List>
        </div>
    </div>
</template>

<script>
import List from '../../view/List';
import viewEditor from '../../page/VueEditor';
export default {
    components: {
        List,
        viewEditor
    },

    data() {
        return {
            filters: [{}]
        };
    },
    created() {
        console.log(this.info);
    },
    methods: {
        onFiltersChnage(e) {
            this.filters = e.filter(it => {
                return it.key !== 'userName' && it.key !=='operation' && it.key !=='type' && it.key !=='ip'
            });
        },
        onCommunityChange(e) {
            this.$refs.list.setFilterValue('communityId', e);
        },
        onMeta(meta) {
            metaUtil.updateMeta(meta, 'type', item => {
                item.searchable = false;
                return item;
            });
            metaUtil.updateMeta(meta, 'userName', item => {
                item.searchable = false;
                item.displayInList = false;
                return item;
            });
            metaUtil.updateMeta(meta, 'operation', item => {
                item.displayInList = false;
                return item;
            });
            metaUtil.updateMeta(meta, 'ip', item => {
                item.displayInList = false;
                return item;
            });
        }
    }
};
</script>

<style scoped>
</style>
