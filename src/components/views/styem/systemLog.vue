
<template>
    <div>
        <div class="container">
            <List
                :dataUrl="'log/operation'"
                ref="list"
                :filters="filters"
                :metaUrl="'log/meta'"
                @meta="onMeta"
                :disableTableAction="true"
            >
                <template slot="filter-prefix" class="display_flex">
                    <ticketSearch
                        :metaUrl="'log/meta'"
                        @communityId="onCommunityChange"
                        @filters="onFiltersChnage"
                    ></ticketSearch>
                </template>
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
                if (it.key === 'content') {
                    it.name = '备注';
                }
                return it.key !== 'type';
            });
        },
        onCommunityChange(e) {
            this.$refs.list.setFilterValue('communityId', e);
        },
        onMeta(meta) {
            metaUtil.updateMeta(meta, 'content', item => {
                item.name = '备注';
                return item;
            });
            metaUtil.updateMeta(meta, 'type', item => {
                item.searchable = false;
                return item;
            });
        }
    }
};
</script>

<style scoped>
</style>
