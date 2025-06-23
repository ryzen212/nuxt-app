<script setup>
import { ref } from 'vue';

const links = ref([
    {
        label: "Home",
        items: [
            { label: 'Dashboards', icon: 'pi pi-home', to: '/home' },
            { label: 'Users', icon: 'pi pi-user', to: '/users' }

        ]
    },
    {
        label: "Home",
        items: [
            { label: 'Dashboards', icon: 'pi pi-home', to: '/home' },
            { label: 'Users', icon: 'pi pi-user', to: '/users' }

        ]
    }

]);


</script>

<template>
    <div class="layout-sidebar" >
        <ul class="list-none">
            <template v-for="(link, i) in links" :key="i">
                <li class="mb-2">
                    <div class="text-sm text-gray-400 mb-1">{{ link.label }}</div>
                    <ul>
                        <li v-for="(item, k) in link.items" :key="k" class="hover:bg-surface-800 px-4 py-2 rounded">
                            <NuxtLink :to="item.to" class="flex items-center">
                                <i :class="item.icon + ' mr-4'"></i>
                                <span class="font-bold">{{ item.label }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>
    </div>
</template>
